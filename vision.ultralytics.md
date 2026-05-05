> ## Documentation Index
> Fetch the complete documentation index at: https://visionagents.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ultralytics YOLO

[Ultralytics YOLO](https://ultralytics.com) provides state-of-the-art computer vision for object detection, pose estimation, and segmentation. The plugin enables real-time pose detection with skeleton overlays.

<Info>
  Vision Agents requires a [Stream](https://getstream.io/try-for-free/) account
  for real-time transport. Most providers offer free tiers to get started.
</Info>

## Installation

```sh theme={null}
uv add "vision-agents[ultralytics]"
```

## Quick Start

```python theme={null}
from vision_agents.core import Agent, User
from vision_agents.plugins import ultralytics, gemini, getstream

agent = Agent(
    edge=getstream.Edge(),
    agent_user=User(name="Fitness Coach", id="agent"),
    instructions="Analyze the user's form and provide feedback.",
    llm=gemini.Realtime(fps=10),
    processors=[
        ultralytics.YOLOPoseProcessor(
            model_path="yolo11n-pose.pt",
            conf_threshold=0.5,
            enable_hand_tracking=True,
        )
    ],
)
```

<Note>YOLO models download automatically on first use.</Note>

## Parameters

| Name                      | Type    | Default             | Description                    |
| ------------------------- | ------- | ------------------- | ------------------------------ |
| `model_path`              | `str`   | `"yolo11n-pose.pt"` | YOLO pose model                |
| `conf_threshold`          | `float` | `0.5`               | Keypoint confidence threshold  |
| `device`                  | `str`   | `"cpu"`             | Device (`"cpu"` or `"cuda"`)   |
| `enable_hand_tracking`    | `bool`  | `True`              | Draw hand skeleton connections |
| `enable_wrist_highlights` | `bool`  | `True`              | Highlight wrist positions      |

## Model Sizes

| Model             | Speed   | Use Case         |
| ----------------- | ------- | ---------------- |
| `yolo11n-pose.pt` | Fastest | Real-time on CPU |
| `yolo11s-pose.pt` | Fast    | Real-time on GPU |
| `yolo11m-pose.pt` | Medium  | Quality-focused  |
| `yolo11l-pose.pt` | Slower  | Maximum accuracy |

## Next Steps

<CardGroup cols={2}>
  <Card title="Build a Voice Agent" icon="microphone" href="/introduction/voice-agents">
    Get started with voice
  </Card>

  <Card title="Build a Video Agent" icon="video" href="/introduction/video-agents">
    Add video processing
  </Card>
</CardGroup>
