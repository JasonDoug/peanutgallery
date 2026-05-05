import asyncio
import logging
import random
import os
import httpx
from datetime import datetime, timedelta
from typing import List, Optional, Deque
from collections import deque

from vision_agents.core import Agent, User
from vision_agents.core.stt.events import STTTranscriptEvent
from vision_agents.plugins import getstream, fast_whisper, openai # Using openai plugin for OpenRouter
from .models import JokeResponse, JokeCandidate

# Custom Kokoro Remote TTS if needed, otherwise local
try:
    from vision_agents.plugins import kokoro
except ImportError:
    kokoro = None

logger = logging.getLogger(__name__)

class RollingContextWindow:
    def __init__(self, max_duration_seconds: int = 90):
        self.max_duration = timedelta(seconds=max_duration_seconds)
        self.transcripts: Deque[dict] = deque()
        self.scene_descriptions: Deque[dict] = deque()

    def add_transcript(self, text: str):
        self.transcripts.append({"text": text, "timestamp": datetime.now()})
        self._prune()

    def add_scene(self, description: str):
        self.scene_descriptions.append({"text": description, "timestamp": datetime.now()})
        self._prune()

    def _prune(self):
        now = datetime.now()
        while self.transcripts and now - self.transcripts[0]["timestamp"] > self.max_duration:
            self.transcripts.popleft()
        while self.scene_descriptions and now - self.scene_descriptions[0]["timestamp"] > self.max_duration:
            self.scene_descriptions.popleft()

    def get_context(self) -> str:
        dialog = " ".join([t["text"] for t in self.transcripts])
        scenes = " | ".join([s["text"] for s in self.scene_descriptions])
        return f"Recent Dialog: {dialog}\nVisual Action: {scenes}"

class KokoroRemoteCaller:
    def __init__(self, server_url: str):
        self.server_url = server_url.rstrip("/")

    async def generate_speech(self, text: str, voice: str = "af_heart") -> bytes:
        """
        Calls a remote Kokoro server to generate speech.
        Assuming an OpenAI-compatible or similar simple POST endpoint.
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.server_url}/v1/audio/speech",
                    json={
                        "input": text,
                        "model": "kokoro",
                        "voice": voice,
                        "response_format": "mp3"
                    },
                    timeout=30.0
                )
                response.raise_for_status()
                return response.content
        except Exception as e:
            logger.error(f"Remote Kokoro call failed: {e}")
            return b""

class PeanutGalleryEngine:
    def __init__(self, api_key: str, stream_key: str, stream_secret: str, kokoro_url: Optional[str] = None):
        self.api_key = api_key # OpenRouter API Key
        self.stream_key = stream_key
        self.stream_secret = stream_secret
        self.kokoro_url = kokoro_url 
        self.agent: Optional[Agent] = None
        self.device = os.environ.get("DEVICE", "cpu")
        self.context = RollingContextWindow(max_duration_seconds=120)
        self.remote_tts = KokoroRemoteCaller(kokoro_url) if kokoro_url else None
        self.active_sessions: dict = {}

    async def create_riff_agent(self, personality_id: str, system_prompt: str) -> Agent:
        """
        Creates a VisionAgent configured for MST3K riffing.
        """
        # Configure the LLM for OpenRouter
        llm = openai.LLM(
            model="openrouter/auto", 
            api_key=self.api_key,
            base_url="https://openrouter.ai/api/v1"
        )

        # STT for dialog understanding (Local On-prem)
        stt = fast_whisper.STT(model_size="base", device=self.device)

        # TTS (Local or Remote Kokoro)
        tts = kokoro.TTS(device=self.device) if kokoro and not self.remote_tts else None

        self.agent = Agent(
            edge=getstream.Edge(api_key=self.stream_key, api_secret=self.stream_secret),
            agent_user=User(name="PeanutGallery Bot", id="agent"),
            instructions=system_prompt,
            llm=llm,
            stt=stt,
            tts=tts,
        )

        @self.agent.events.subscribe
        async def on_transcript(event: STTTranscriptEvent):
            self.context.add_transcript(event.text)

        return self.agent

    async def run_file_lookahead(self, session_id: str, video_path: str):
        """
        Processes a local video file 60s ahead of 'current_time'.
        (Ticket BE-001)
        """
        if not self.agent:
            return

        logger.info(f"Starting lookahead processing for {video_path}")
        
        # This is a conceptual implementation. In a real scenario, we'd use
        # a dedicated processor loop to extract frames and audio chunks.
        # For the prototype, we'll simulate the lookahead drift.
        
        last_joke_time = datetime.now()
        
        while session_id in self.active_sessions:
            # 1. Simulate Vision Extraction (e.g., every 5 seconds)
            # In real impl, we'd pull a frame from video_path at +60s
            self.context.add_scene("A group of characters is walking into a dark mansion. One is holding a flashlight.")
            
            # 2. Check if it's time for a joke (e.g., every 20-30 seconds)
            if datetime.now() - last_joke_time > timedelta(seconds=25):
                joke_text = await self.generate_and_score_joke()
                if joke_text:
                    logger.info(f"Generated Riff: {joke_text}")
                    
                    # 3. Synthesize Voice
                    if self.remote_tts:
                        audio_data = await self.remote_tts.generate_speech(joke_text)
                        # Push audio_data to GetStream Edge with timestamp offset
                    
                    last_joke_time = datetime.now()
            
            await asyncio.sleep(5) # Processing loop interval

    async def generate_and_score_joke(self) -> Optional[str]:
        """
        Uses OpenRouter to generate multiple jokes and score them.
        """
        if not self.agent:
            return None

        context_str = self.context.get_context()
        
        prompt = f"""
        {context_str}

        You are providing MST3K-style riffing commentary.
        Based on the recent dialog and visual action above, generate 3 hilarious riffs.
        
        Criteria:
        1. Must be relevant to the context.
        2. Must be witty and unexpected.
        3. Score each riff (1-10) based on 'Wit' and 'Timing' relative to the dialog.

        Return your response in JSON format matching this schema:
        {{
            "candidates": [
                {{ "text": "riff 1", "wit_score": 8, "timing_score": 9, "reasoning": "..." }},
                ...
            ],
            "best_joke_index": 0
        }}
        """
        
        try:
            # Note: We use structured output if supported, or just parse the JSON
            response_text = await self.agent.simple_response(prompt)
            # Basic parsing (in real usage we'd use a parser or json mode)
            # For brevity, let's assume we get valid JSON
            import json
            data = json.loads(response_text)
            best_joke = data["candidates"][data["best_joke_index"]]["text"]
            return best_joke
        except Exception as e:
            logger.error(f"Joke generation failed: {e}")
            return None
