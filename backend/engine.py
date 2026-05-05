import asyncio
import logging
import random
import os
import httpx
import json
import re
from datetime import datetime, timedelta, timezone
from typing import List, Optional, Deque, Dict
from collections import deque
from pydantic import ValidationError

from vision_agents.core import Agent, User
from vision_agents.core.stt.events import STTTranscriptEvent
from vision_agents.plugins import getstream, fast_whisper, openai # Using openai plugin for OpenRouter
from models import JokeResponse, JokeCandidate

# Custom Kokoro Remote TTS if needed, otherwise local
try:
    from vision_agents.plugins import kokoro
except ImportError:
    kokoro = None

logger = logging.getLogger(__name__)

class RollingContextWindow:
    def __init__(self, max_duration_seconds: int = 120):
        self.max_duration = timedelta(seconds=max_duration_seconds)
        self.transcripts: Deque[dict] = deque()
        self.scene_descriptions: Deque[dict] = deque()

    def add_transcript(self, text: str):
        self.transcripts.append({"text": text, "timestamp": datetime.now(timezone.utc)})
        self._prune()

    def add_scene(self, description: str):
        self.scene_descriptions.append({"text": description, "timestamp": datetime.now(timezone.utc)})
        self._prune()

    def _prune(self):
        now = datetime.now(timezone.utc)
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
        self._client = httpx.AsyncClient(timeout=30.0)

    async def close(self):
        await self._client.aclose()

    async def generate_speech(self, text: str, voice: str = "af_heart") -> bytes:
        """
        Calls a remote Kokoro server to generate speech.
        """
        try:
            response = await self._client.post(
                f"{self.server_url}/v1/audio/speech",
                json={
                    "input": text,
                    "model": "kokoro",
                    "voice": voice,
                    "response_format": "mp3"
                }
            )
            response.raise_for_status()
            return response.content
        except httpx.HTTPError as e:
            logger.error(f"Remote Kokoro call failed: {e}")
            return b""

class PeanutGalleryEngine:
    def __init__(self, api_key: str, stream_key: str, stream_secret: str, kokoro_url: Optional[str] = None):
        self.api_key = api_key # OpenRouter API Key
        self.stream_key = stream_key
        self.stream_secret = stream_secret
        self.kokoro_url = kokoro_url 
        self.device = os.environ.get("DEVICE", "cpu")
        self.remote_tts = KokoroRemoteCaller(kokoro_url) if kokoro_url else None
        self.active_sessions: Dict[str, Dict] = {}

    async def close(self):
        if self.remote_tts:
            await self.remote_tts.close()

    async def create_riff_agent(self, session_id: str, personality_id: str, system_prompt: str) -> Agent:
        """
        Creates a VisionAgent configured for MST3K riffing and stores it in session state.
        """
        local_llm_url = os.environ.get("LOCAL_LLM_URL")
        
        if local_llm_url:
            llm = openai.LLM(
                model="local",
                api_key="not-needed",
                base_url=local_llm_url
            )
        else:
            llm = openai.LLM(
                model="openrouter/auto", 
                api_key=self.api_key,
                base_url="https://openrouter.ai/api/v1"
            )

        # STT for dialog understanding (Local On-prem)
        stt = fast_whisper.STT(model_size="base", device=self.device)

        # TTS (Local or Remote Kokoro)
        tts = kokoro.TTS(device=self.device) if kokoro and not self.remote_tts else None

        agent = Agent(
            edge=getstream.Edge(api_key=self.stream_key, api_secret=self.stream_secret),
            agent_user=User(name="PeanutGallery Bot", id="agent"),
            instructions=system_prompt,
            llm=llm,
            stt=stt,
            tts=tts,
        )

        context = RollingContextWindow(max_duration_seconds=120)

        @agent.events.subscribe
        async def on_transcript(event: STTTranscriptEvent):
            context.add_transcript(event.text)

        self.active_sessions[session_id] = {
            "agent": agent,
            "context": context,
            "task": None
        }

        return agent

    async def run_file_lookahead(self, session_id: str, video_path: str):
        """
        Processes a local video file 60s ahead of 'current_time'.
        """
        session = self.active_sessions.get(session_id)
        if not session:
            return

        agent = session["agent"]
        context = session["context"]

        logger.info(f"Starting lookahead processing for {video_path}")
        
        try:
            last_joke_time = datetime.now(timezone.utc)
            
            while session_id in self.active_sessions:
                # 1. Simulate Vision Extraction (STUB)
                logger.debug("Simulating vision extraction (lookahead +60s)")
                context.add_scene("A group of characters is walking into a dark mansion. One is holding a flashlight.")
                
                # 2. Check if it's time for a joke
                if datetime.now(timezone.utc) - last_joke_time > timedelta(seconds=25):
                    joke_text = await self.generate_and_score_joke(session_id)
                    if joke_text:
                        logger.info(f"Generated Riff: {joke_text}")
                        
                        # 3. Synthesize Voice
                        if self.remote_tts:
                            audio_data = await self.remote_tts.generate_speech(joke_text)
                            # TODO: Implement GetStream publish path for remote audio
                            if audio_data:
                                logger.info(f"Synthesized remote audio: {len(audio_data)} bytes")
                        
                        last_joke_time = datetime.now(timezone.utc)
                
                await asyncio.sleep(5)
        except asyncio.CancelledError:
            logger.info(f"Lookahead task for session {session_id} cancelled.")
        except Exception as e:
            logger.error(f"Error in lookahead loop for {session_id}: {e}")

    async def generate_and_score_joke(self, session_id: str) -> Optional[str]:
        """
        Uses OpenRouter to generate multiple jokes and score them.
        """
        session = self.active_sessions.get(session_id)
        if not session:
            return None

        agent = session["agent"]
        context = session["context"]
        context_str = context.get_context()
        
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
            # Request structured JSON
            response_text = await agent.simple_response(
                prompt, 
                response_format={"type": "json_object"}
            )
            
            # Sanitize and extract JSON payload
            match = re.search(r"\{.*\}", response_text, re.DOTALL)
            if not match:
                logger.error(f"No JSON found in LLM response: {response_text}")
                return None
            
            payload = match.group(0)
            parsed = JokeResponse.model_validate_json(payload)
            
            if not parsed.candidates:
                return None
            
            # Clamp index and return best joke
            idx = max(0, min(parsed.best_joke_index, len(parsed.candidates) - 1))
            return parsed.candidates[idx].text
            
        except (ValidationError, ValueError, json.JSONDecodeError) as e:
            logger.error(f"Joke validation/parsing failed: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error in joke generation: {e}")
            return None
