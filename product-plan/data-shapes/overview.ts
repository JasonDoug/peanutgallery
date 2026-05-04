// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/core-commentary-engine
// -----------------------------------------------------------------------------

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
}

export interface CoreCommentaryEngineData {
  agents: Agent[]
  voices: Voice[]
  commentary: Commentary[]
  videoSources: VideoSource[]
  activeSession: ActiveSession
}

// -----------------------------------------------------------------------------
// From: sections/prompt-and-personality-system
// -----------------------------------------------------------------------------

export interface ExampleOutput {
  input: string
  output: string
}

export interface Personality {
  id: string
  name: string
  description: string
  tone: 'slapstick' | 'dry-humor' | 'educational' | 'hype' | 'supportive' | 'technical' | 'custom'
  systemPrompt: string
  temperature: number
  model: string
  active: boolean
  exampleOutputs: ExampleOutput[]
  forbiddenTopics: string[]
  outputFormat: 'plain-text' | 'markdown' | 'json'
  responseStyleExamples: string[]
  usageCount: number
  averageRating: number
  lastUsed: string | null
  createdAt: string
  isPreset: boolean
}

export interface PersonalitySystemData {
  _meta: {
    models: Record<string, string>
    relationships: string[]
  }
  personalities: Personality[]
}

// -----------------------------------------------------------------------------
// From: sections/commentary-history
// -----------------------------------------------------------------------------

export interface CommentaryEntry {
  timestamp: string
  text: string
}

export interface CommentarySession {
  id: string
  title: string
  date: string
  thumbnailUrl: string
  personalityName: string
  personalityId: string
  duration: string
  commentaryCount: number
  entries: CommentaryEntry[]
}

export interface CommentaryHistoryData {
  _meta: {
    models: Record<string, string>
    relationships: string[]
  }
  sessions: CommentarySession[]
}
