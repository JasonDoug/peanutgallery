export interface Agent {
  id: string
  name: string
  personality: string
  voiceId: string
  temperature: number
  isDefault: boolean
}

export interface Voice {
  id: string
  name: string
  provider: string
  gender: 'male' | 'female' | 'neutral'
  accent: string
}

export interface Commentary {
  id: string
  agentId: string
  timestamp: string
  text: string
  createdAt: string
}

export interface VideoSource {
  id: string
  type: 'url' | 'upload'
  url?: string
  fileName?: string
  title: string
}

export interface ActiveSession {
  videoSourceId: string
  agentId: string
  voiceId: string
  delaySeconds: number
  volume: number
  isPlaying: boolean
  sessionId?: string
}

export interface CoreCommentaryEngineData {
  agents: Agent[]
  voices: Voice[]
  commentary: Commentary[]
  videoSources: VideoSource[]
  activeSession: ActiveSession
}

export interface CoreCommentaryEngineProps {
  data: CoreCommentaryEngineData
  /** Called when the user selects a different agent for commentary */
  onAgentSelect?: (agentId: string) => void
  /** Called when the user selects a different voice */
  onVoiceSelect?: (voiceId: string) => void
  /** Called when the user submits a video URL */
  onVideoUrlSubmit?: (url: string) => void
  /** Called when the user uploads a video file */
  onVideoUpload?: (file: File) => void
  /** Called when the user selects a video source */
  onSourceSelect?: (sourceId: string) => void
  /** Called when the user clicks "Start Commentary" to launch playback */
  onStartCommentary?: () => void
  /** Called when the user toggles play/pause during playback */
  onTogglePlayback?: () => void
  /** Called when the user adjusts the commentary delay */
  onDelayChange?: (seconds: number) => void
  /** Called when the user adjusts the volume */
  onVolumeChange?: (volume: number) => void
}
