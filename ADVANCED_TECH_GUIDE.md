# Advanced Technology Guide: VisionAgents & Multi-Domain AI

PeanutGallery leverages a sophisticated, real-time AI stack to create interactive video companions. At its core is the **GetStream VisionAgents** framework, which allows us to build multi-modal agents that can "watch" video, "listen" to dialog, and "speak" back to the user with ultra-low latency.

## 1. The Advanced Tech Stack

### **GetStream VisionAgents (The Orchestrator)**
VisionAgents is the central nervous system of PeanutGallery. It manages the complex synchronization between video tracks, audio streams, and various AI models.
- **Impact**: Enables sub-500ms join times and sub-30ms audio/video latency via Stream's edge network.
- **Role**: Handles WebRTC transport, event subscriptions (e.g., "when a face is detected"), and the agent's lifecycle.

### **Fast-Whisper (Local STT)**
For dialog understanding, we use **Fast-Whisper**, an on-prem implementation of OpenAI's Whisper model.
- **Impact**: Provides highly accurate, real-time transcription of movie dialog without the cost or latency of cloud APIs.
- **Role**: Feeds the "Rolling Context Window" with a text stream of what characters are saying.

### **Moondream & Ultralytics (Local Vision)**
We prioritize local vision processing using models like **Moondream** (a tiny VLM) and **Ultralytics YOLO**.
- **Impact**: Allows the AI to describe the visual scene (e.g., "A character is nervously looking around a dark room") or detect specific objects/poses locally.
- **Role**: Converts raw video frames into text-based scene descriptions or structured data for the LLM.

### **Kokoro (The Voice)**
**Kokoro** is our on-prem TTS engine, capable of generating human-like, high-fidelity speech.
- **Impact**: Delivers the "personality" of the agent through expressive voice synthesis.
- **Role**: Converts the generated riffs into audio clips that are injected back into the video stream.

### **OpenRouter (The Brain)**
**OpenRouter** provides access to the world's most powerful LLMs (like Claude 3.5 or Llama 3) via a single API.
- **Impact**: Handles the high-level comedic reasoning, joke generation, and scoring.
- **Role**: Receives the visual + dialog context and produces the final "riff."

---

## 2. Impact Areas of this Technology

### **Contextual Timing (The "Secret Sauce")**
Unlike static chatbots, VisionAgents allow PeanutGallery to understand **timing**. By analyzing both the video frames and the transcript, the agent knows *when* to interject—for example, during a lull in dialog or immediately after a visually shocking moment.

### **Temporal Synchronization**
The use of **Lookahead Buffers** (1-minute processing window) ensures that the complex reasoning required for a good joke happens *before* the user sees the frame. This results in perfectly timed commentary that feels like it's happening live.

---

## 3. Prompt-Driven Domain Flexibility

The most powerful aspect of this architecture is its **Domain Agnosticism**. Because the underlying engine simply processes "visual context + dialog context," the agent's entire purpose can be transformed via the **System Prompt**.

### **The MST3K Riffer (Current Default)**
- **Prompt**: "You are a witty, sarcastic robot riffing on a bad movie. Focus on plot holes and visual absurdities."
- **Focus**: Comedic timing, wordplay, and sarcasm.

### **The Sports Announcer**
- **Prompt**: "You are a professional sports broadcaster. Provide play-by-play analysis, track player stats, and maintain high energy."
- **Focus**: Object detection (tracking the ball/players) and energetic delivery.

### **The Science Channel Companion**
- **Prompt**: "You are an educational science expert. Explain the physics of what's happening on screen and provide historical context for scientific discoveries."
- **Focus**: Visual identification of scientific phenomena and educational transcription.

### **The Accessibility Narrator**
- **Prompt**: "You are an audio description expert. Narrate the visual actions on screen for visually impaired users, focusing on movement, expressions, and setting."
- **Focus**: Detailed scene descriptions and objective narration.

---

## 4. Future Vision: Multi-Agent Riffing
By taking advantage of VisionAgents' support for multiple participants, future versions of PeanutGallery will allow **multiple AI personalities** to join the same session. They can "hear" each other's riffs and respond, creating a true MST3K theater experience with Crow, Tom Servo, and Joel all interacting in real-time.
