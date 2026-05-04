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

export interface CommentaryCardProps {
  session: CommentarySession
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export interface CommentaryDetailProps {
  session: CommentarySession
  onBack: () => void
  onDelete: (id: string) => void
}

export interface CommentaryGridProps {
  sessions: CommentarySession[]
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
}

/** Called when user selects a commentary session to view details */
export type OnSelectSession = (id: string) => void

/** Called when user deletes a commentary session */
export type OnDeleteSession = (id: string) => void

/** Called when user navigates back to the grid from detail view */
export type OnBack = () => void
