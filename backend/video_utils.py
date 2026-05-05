import av
import logging
import yt_dlp
from PIL import Image
from typing import Optional

logger = logging.getLogger(__name__)

class FileFrameExtractor:
    def __init__(self, video_path: str):
        self.video_path = video_path
        self.container = None

    def __enter__(self):
        try:
            self.container = av.open(self.video_path)
            return self
        except Exception as e:
            logger.error(f"Failed to open video file {self.video_path}: {e}")
            raise

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.container:
            self.container.close()

    def get_frame_at_timestamp(self, timestamp_seconds: float) -> Optional[Image.Image]:
        """
        Seeks to the given timestamp using the stream timebase.
        """
        if not self.container:
            return None

        try:
            video_stream = self.container.streams.video[0]
            # Convert seconds to the stream's timebase (Ticket CodeRabbit fix)
            target_ts = int(timestamp_seconds / video_stream.time_base)
            
            self.container.seek(target_ts, any_frame=False, backward=True, stream=video_stream)

            # Read the next frame
            for frame in self.container.decode(video=0):
                return frame.to_image()
        except Exception as e:
            logger.error(f"Error extracting frame at {timestamp_seconds}s: {e}")
            return None
        
        return None

class YouTubeIngestor:
    @staticmethod
    def get_stream_url(youtube_url: str) -> Optional[str]:
        """
        Uses yt-dlp to extract the direct video stream URL with timeout.
        """
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'quiet': True,
            'no_warnings': True,
            'socket_timeout': 10, # Added timeout
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(youtube_url, download=False)
                return info.get('url')
        except (yt_dlp.utils.DownloadError, yt_dlp.utils.ExtractorError) as e:
            logger.error(f"Failed to extract YouTube URL: {e}")
            return None
