import type { CommentaryGridProps } from '../types'
import { CommentaryCard } from './CommentaryCard'
import { EmptyState } from '@/components/EmptyState'
import { History, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function CommentaryGrid({ sessions, onSelectSession, onDeleteSession }: CommentaryGridProps) {
  if (sessions.length === 0) {
    return <EmptyState type="commentary-history" />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Commentary History</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">Revisit your favorite movie nights and AI riffs.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input 
            placeholder="Search sessions..." 
            className="pl-10 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 focus:ring-lime-500"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <CommentaryCard 
            key={session.id} 
            session={session} 
            onSelect={onSelectSession} 
            onDelete={onDeleteSession}
          />
        ))}
      </div>
    </div>
  )
}
