> ## Documentation Index
> Fetch the complete documentation index at: https://visionagents.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Kokoro

[Kokoro](https://github.com/hexgrad/kokoro) is a local TTS engine that runs entirely on your machine. No API key or internet connection required. Ideal for offline voice synthesis, privacy-sensitive applications, or prototyping.

<Info>
  Vision Agents requires a [Stream](https://getstream.io/try-for-free/) account
  for real-time transport. Most providers offer free tiers to get started.
</Info>

## Installation

```sh theme={null}
uv add "vision-agents[kokoro]"
```

## Quick Start

```python theme={null}
from vision_agents.core import Agent, User
from vision_agents.plugins import kokoro, gemini, deepgram, getstream

agent = Agent(
    edge=getstream.Edge(),
    agent_user=User(name="Assistant", id="agent"),
    instructions="You are a helpful assistant.",
    llm=gemini.LLM("gemini-3-flash-preview"),
    stt=deepgram.STT(),
    tts=kokoro.TTS(),
)
```

<Note>Kokoro runs locally. No API key or internet connection is required.</Note>

## Parameters

| Name        | Type    | Default      | Description                                       |
| ----------- | ------- | ------------ | ------------------------------------------------- |
| `voice`     | `str`   | `"af_heart"` | Voice preset                                      |
| `lang_code` | `str`   | `"a"`        | Language code (`"a"` = American English)          |
| `speed`     | `float` | `1.0`        | Playback speed (e.g., `0.9` slower, `1.2` faster) |
| `device`    | `str`   | `None`       | Device (`"cuda"`, `"cpu"`, or auto-detect)        |

## Next Steps

<CardGroup cols={2}>
  <Card title="Build a Voice Agent" icon="microphone" href="/introduction/voice-agents">
    Get started with voice
  </Card>

  <Card title="Build a Video Agent" icon="video" href="/introduction/video-agents">
    Add video processing
  </Card>
</CardGroup>
