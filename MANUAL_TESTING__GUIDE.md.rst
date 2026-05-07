This guide will walk you through testing the Real-Time Video Understanding,
  YouTube Ingestion, and Commentary Audio Mixer.

  1. Prerequisites
  Before starting, ensure you have the following:
   - API Keys: Valid keys for OpenRouter and GetStream.
   - Hardware: An NVIDIA GPU is recommended (set DEVICE=cuda in .env).
   - Local Media: A short .mp4 file for local testing (e.g., ~/test_movie.mp4).
   - Kokoro Server: Your on-prem Kokoro server should be reachable.

  2. Environment Configuration
  Create a .env file in the backend/ directory:
   1 cd backend
   2 cp .env.example .env
   3 # Edit .env and fill in your keys:
   4 OPENROUTER_API_KEY=your_key_here
   5 STREAM_API_KEY=your_key_here
   6 STREAM_API_SECRET=your_key_here
   7 KOKORO_SERVER_URL=http://your-kokoro-ip:port
   8 DEVICE=cuda # or cpu

  3. Launching the System

  Step A: Start the Backend
   1 cd backend
   2 uv sync
   3 uv run python main.py
  Wait for: App loaded successfully.

  Step B: Start the Frontend
  In a new terminal:
   1 cd frontend
   2 npm install
   3 npm run dev
  Open your browser to http://localhost:5173.

  ---

  4. Test Scenario A: Local Video File
   1. Navigate to the Home page.
   2. In the Video URL box, enter the absolute path to a local video file (e.g.,
      /home/jason/Videos/sample.mp4).
   3. Click Submit.
   4. Select the new video source from the list.
   5. Select an AI Personality (e.g., "Snappy Slapstick").
   6. Click "Start Commentary".

  What should happen:
   - The video player appears and starts playing.
   - Backend Logs: You will see Starting real lookahead processing.
   - Backend Logs: Every 5s, you'll see Lookahead (60s) Scene: [Moondream
     Description].
   - The Riff: After ~25s, the LLM will generate a joke. You'll see Generated
     Riff: ... and then Synthesized remote audio.
   - The Result: The joke text appears at the bottom of the video player, and
     the AI's voice plays through your speakers.

  ---

  5. Test Scenario B: YouTube Riffing
   1. Paste a YouTube URL into the input box.
   2. Click Submit.
   3. Select the YouTube source.
   4. Click "Start Commentary".

  What should happen:
   - The YouTube video loads in an iframe embed.
   - The backend uses yt-dlp to resolve the stream.
   - The AI "watches" the YouTube stream 60 seconds ahead and generates riffs
     exactly like the local file mode.

  ---

  6. Verification Checklist
   - [ ] Timing: Does the joke text appear exactly when the audio starts?
   - [ ] Context: Does the joke actually relate to the scene described in the
     logs?
   - [ ] Cleanup: When you click Pause or Stop, does the backend log say
     Lookahead task cancelled?
   - [ ] Reliability: Try starting two different sessions in two browser tabs.
     They should now be completely isolated.
