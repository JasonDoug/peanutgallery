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

export interface PersonalityCardProps {
  personality: Personality
  onToggleActive: (id: string, active: boolean) => void
  onSelect: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export interface PersonalityEditorProps {
  personality: Personality | null
  onSave: (personality: Personality) => void
  onCancel: () => void
  onTestRun: (personality: Personality, sampleInput: string) => void
  testOutput: string | null
  isSaving: boolean
}

export interface PersonalityGridProps {
  personalities: Personality[]
  onSelectPersonality: (id: string) => void
  onToggleActive: (id: string, active: boolean) => void
  onEditPersonality: (id: string) => void
  onCreateNew: () => void
  onDeletePersonality: (id: string) => void
}

/** Called when user selects a personality for editing */
export type OnEditPersonality = (id: string) => void

/** Called when user saves a personality (new or updated) */
export type OnSavePersonality = (personality: Personality) => void

/** Called when user toggles a personality active/inactive */
export type OnToggleActive = (id: string, active: boolean) => void

/** Called when user deletes a personality (only custom ones) */
export type OnDeletePersonality = (id: string) => void

/** Called when user creates a new custom personality */
export type OnCreateNew = () => void

/** Called when user wants to test-run a personality with sample input */
export type OnTestRun = (personality: Personality, sampleInput: string) => void
