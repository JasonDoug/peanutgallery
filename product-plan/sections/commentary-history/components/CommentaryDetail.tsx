import type { CommentaryDetailProps } from '../types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Trash2, 
  Play, 
  Clock, 
  User, 
  Calendar,
  MessageSquare,
  Bot
} from 'lucide-react'

export function CommentaryDetail({ session, onBack, onDelete }: CommentaryDetailProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to History
        </Button>
        <Button 
          variant="outline" 
          className="text-red-500 border-red-100 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:border-red-900/50 dark:hover:bg-red-950/40"
          onClick={() => onDelete(session.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Session
        </Button>
      </header>

      <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl group">
        <img 
          src={session.thumbnailUrl} 
          alt={session.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-8 right-8">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">
            {session.title}
          </h1>
          <div className="flex items-center gap-4 text-stone-300">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {session.date}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-lime-400">
              <Clock className="w-4 h-4" />
              {session.duration}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Bot className="w-4 h-4" />
              {session.personalityName}
            </div>
          </div>
        </div>
        <button className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform hover:scale-110 group-hover:bg-lime-500 group-hover:text-stone-950 group-hover:border-transparent">
          <Play className="w-8 h-8 ml-1 fill-current" />
        </button>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-lime-500" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Commentary Transcript</h2>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] tracking-widest uppercase">
            {session.commentaryCount} Entries
          </Badge>
        </div>
        
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {session.entries.map((entry, i) => (
            <div key={i} className="px-8 py-6 flex gap-6 hover:bg-stone-50/30 dark:hover:bg-stone-800/20 transition-colors group">
              <div className="shrink-0 w-16 text-xs font-mono font-bold text-stone-400 dark:text-stone-600 tabular-nums pt-1 group-hover:text-lime-600 dark:group-hover:text-lime-500 transition-colors">
                {entry.timestamp}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-stone-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{session.personalityName}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed italic text-lg">
                  "{entry.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {session.entries.length === 0 && (
          <div className="px-8 py-12 text-center text-stone-400 dark:text-stone-600">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p>No commentary recorded for this session.</p>
          </div>
        )}
      </div>
    </div>
  )
}
