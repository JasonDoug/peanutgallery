import type { CommentaryCardProps } from '../types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Calendar, Clock, MessageSquare, Trash2 } from 'lucide-react'

export function CommentaryCard({ session, onSelect, onDelete }: CommentaryCardProps) {
  return (
    <Card 
      className="group overflow-hidden border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(session.id)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={session.thumbnailUrl} 
          alt={session.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 text-stone-950 fill-current" />
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-stone-900/80 backdrop-blur-md text-white border-stone-700">
            {session.duration}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-stone-900 dark:text-stone-50 truncate mb-1">
          {session.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {session.date}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {session.commentaryCount} jokes
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-stone-50 dark:bg-stone-950/50 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
            {session.personalityName}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(session.id)
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
