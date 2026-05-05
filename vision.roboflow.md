> ## Documentation Index
> Fetch the complete documentation index at: https://visionagents.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Roboflow

[Roboflow](https://roboflow.com) provides computer vision tools for object detection. The plugin offers both cloud-hosted inference (access to pre-trained models from [Roboflow Universe](https://universe.roboflow.com/)) and local RF-DETR models.

<Info>
  Vision Agents requires a [Stream](https://getstream.io/try-for-free/) account
  for real-time transport. Most providers offer free tiers to get started.
</Info>

## Installation

```sh theme={null}
uv add "vision-agents[roboflow]"
```

## Cloud Detection

Uses Roboflow's hosted API with pre-trained models.

```python theme={null}
from vision_agents.core import Agent, User
from vision_agents.plugins import roboflow, gemini, getstream

agent = Agent(
    edge=getstream.Edge(),
    agent_user=User(name="Assistant", id="agent"),
    instructions="You are a sports analyst.",
    llm=gemini.Realtime(fps=10),
    processors=[
        roboflow.RoboflowCloudDetectionProcessor(
            model_id="football-players-detection-3zvbc/20",
            classes=["player"],
            conf_threshold=0.5,
        )
    ],
)
```

<Warning>
  Set `ROBOFLOW_API_KEY` in your environment or pass `api_key` directly.
</Warning>

| Name             | Type        | Default | Description                          |
| ---------------- | ----------- | ------- | ------------------------------------ |
| `model_id`       | `str`       | —       | Roboflow Universe model ID           |
| `classes`        | `List[str]` | `None`  | Classes to detect (or all if `None`) |
| `conf_threshold` | `float`     | `0.5`   | Confidence threshold                 |
| `fps`            | `int`       | `5`     | Frame processing rate                |
| `annotate`       | `bool`      | `True`  | Draw bounding boxes                  |

## Local Detection

Runs RF-DETR models locally without API calls.

```python theme={null}
processor = roboflow.RoboflowLocalDetectionProcessor(
    model_id="rfdetr-base",
    classes=["person"],
    conf_threshold=0.5,
)
```

| Name             | Type        | Default                | Description                                                        |
| ---------------- | ----------- | ---------------------- | ------------------------------------------------------------------ |
| `model_id`       | `str`       | `"rfdetr-seg-preview"` | RF-DETR model (`"rfdetr-nano"`, `"rfdetr-base"`, `"rfdetr-large"`) |
| `classes`        | `List[str]` | `None`                 | Classes to detect                                                  |
| `conf_threshold` | `float`     | `0.5`                  | Confidence threshold                                               |

## Cloud vs Local

|              | Cloud                                            | Local                                       |
| ------------ | ------------------------------------------------ | ------------------------------------------- |
| **Use when** | Access to Roboflow Universe models               | Higher throughput, avoid rate limits        |
| **Pros**     | Thousands of pre-trained models, no GPU required | No API costs, lower latency, works offline  |
| **Cons**     | Requires API key, potential rate limits          | Requires local compute, RF-DETR models only |

## Next Steps

<CardGroup cols={2}>
  <Card title="Build a Voice Agent" icon="microphone" href="/introduction/voice-agents">
    Get started with voice
  </Card>

  <Card title="Build a Video Agent" icon="video" href="/introduction/video-agents">
    Add video processing
  </Card>
</CardGroup>
