import { type LucideIcon, MessageSquare, History, Sparkles } from 'lucide-react'

interface EmptyStateProps {
  type: 'commentary-history' | 'personalities' | 'active-session'
  title?: string
  description?: string
  icon?: LucideIcon
}

export function EmptyState({ type, title, description, icon: Icon }: EmptyStateProps) {
  const defaults = {
    'commentary-history': {
      title: 'No History Yet',
      description: 'Your past commentary sessions will appear here.',
      icon: History
    },
    'personalities': {
      title: 'No Personalities',
      description: 'Create your first custom personality to get started.',
      icon: Sparkles
    },
    'active-session': {
      title: 'No Active Session',
      description: 'Start a new commentary session from the home screen.',
      icon: MessageSquare
    }
  }

  const { title: defaultTitle, description: defaultDescription, icon: DefaultIcon } = defaults[type]
  const FinalIcon = Icon || DefaultIcon

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 dark:bg-stone-900/50 rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
        <FinalIcon className="w-8 h-8 text-stone-400 dark:text-stone-600" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">{title || defaultTitle}</h3>
      <p className="text-stone-500 dark:text-stone-400 mt-2 max-w-xs">{description || defaultDescription}</p>
    </div>
  )
}
