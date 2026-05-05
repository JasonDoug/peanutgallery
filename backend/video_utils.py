import av
import logging
import yt_dlp
from PIL import Image
import io
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
        Seeks to the given timestamp and extracts the closest keyframe.
        """
        if not self.container:
            return None

        try:
            # Seek to the timestamp (in microseconds)
            target_ts = int(timestamp_seconds * 1_000_000)
            self.container.seek(target_ts, any_frame=False, backward=True, stream=self.container.streams.video[0])

            # Read the next frame
            for frame in self.container.decode(video=0):
                # Convert to PIL Image
                return frame.to_image()
        except Exception as e:
            logger.error(f"Error extracting frame at {timestamp_seconds}s: {e}")
            return None
        
        return None

class YouTubeIngestor:
    @staticmethod
    def get_stream_url(youtube_url: str) -> Optional[str]:
        """
        Uses yt-dlp to extract the direct video stream URL.
        """
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'quiet': True,
            'no_warnings': True,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(youtube_url, download=False)
                return info.get('url')
        except Exception as e:
            logger.error(f"Failed to extract YouTube URL: {e}")
            return None
