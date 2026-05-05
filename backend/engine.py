import asyncio
import logging
import random
from datetime import datetime, timedelta
from typing import List, Optional

from vision_agents.core import Agent, User
from vision_agents.plugins import getstream, fast_whisper, openai # Using openai plugin for OpenRouter

# Custom Kokoro Remote TTS if needed, otherwise local
try:
    from vision_agents.plugins import kokoro
except ImportError:
    kokoro = None

logger = logging.getLogger(__name__)

class PeanutGalleryEngine:
    def __init__(self, api_key: str, stream_key: str, stream_secret: str, kokoro_url: Optional[str] = None):
        self.api_key = api_key # OpenRouter API Key
        self.stream_key = stream_key
        self.stream_secret = stream_secret
        self.kokoro_url = kokoro_url # If using remote server
        self.agent: Optional[Agent] = None

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
        stt = fast_whisper.STT(model_size="base")

        # TTS (Local or Remote Kokoro)
        # TODO: Implement remote kokoro caller if self.kokoro_url is set
        tts = kokoro.TTS() if kokoro else None

        self.agent = Agent(
            edge=getstream.Edge(api_key=self.stream_key, api_secret=self.stream_secret),
            agent_user=User(name="PeanutGallery Bot", id="agent"),
            instructions=system_prompt,
            llm=llm,
            stt=stt,
            tts=tts,
        )

        # Buffer for STT transcript (last 60s)
        self.transcript_buffer = []

        @self.agent.events.subscribe
        async def on_transcript(event: fast_whisper.TranscriptEvent):
            self.transcript_buffer.append({
                "text": event.text,
                "timestamp": datetime.now()
            })
            # Prune buffer older than 2 minutes
            now = datetime.now()
            self.transcript_buffer = [t for t in self.transcript_buffer if now - t["timestamp"] < timedelta(minutes=2)]

        return self.agent

    async def generate_joke(self, scene_description: str) -> str:
        """
        Combines visual and dialog context to generate a riff.
        """
        if not self.agent:
            return ""

        dialog_context = " ".join([t["text"] for t in self.transcript_buffer])
        
        prompt = f"""
        Visual Context: {scene_description}
        Recent Dialog: {dialog_context}

        Based on the above, generate 3 hilarious MST3K-style riffs. 
        Score them 1-10 based on wit and timing.
        Return ONLY the best joke as plain text.
        """
        
        response = await self.agent.simple_response(prompt)
        return response

    async def start_session(self, video_source: str, personality_id: str):
        # Implementation of the 1-minute lookahead/buffering logic goes here
        pass
