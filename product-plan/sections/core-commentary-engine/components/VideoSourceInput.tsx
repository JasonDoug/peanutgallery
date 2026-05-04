import { useState, useRef } from 'react'
import { Film, Upload, Link2, X } from 'lucide-react'

interface VideoSourceInputProps {
  sources: Array<{ id: string; type: 'url' | 'upload'; title: string; url?: string; fileName?: string }>
  activeSourceId?: string
  onUrlSubmit?: (url: string) => void
  onUpload?: (file: File) => void
  onSelect?: (sourceId: string) => void
}

export function VideoSourceInput({
  sources,
  activeSourceId,
  onUrlSubmit,
  onUpload,
  onSelect,
}: VideoSourceInputProps) {
  const [url, setUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const activeSource = sources.find(s => s.id === activeSourceId)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Film size={16} className="text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]" />
        <h3 className="text-sm font-bold font-['Space_Grotesk'] text-zinc-200 tracking-wide uppercase">
          Video Source
        </h3>
      </div>

      {activeSource && (
        <div className="flex items-center gap-3 p-3 bg-zinc-800/60 border border-zinc-700/50 rounded-lg group hover:border-rose-500/20 transition-all duration-300">
          <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center shrink-0 group-hover:bg-rose-500/10 transition-colors duration-300">
            <Film size={18} className="text-rose-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-100 truncate">{activeSource.title}</p>
            <p className="text-xs text-zinc-400">
              {activeSource.type === 'url' ? 'URL' : 'Uploaded file'}
            </p>
          </div>
          <button
            onClick={() => onSelect?.('')}
            className="p-1 rounded hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {!activeSource && (
        <div className="space-y-3">
          {!showUrlInput ? (
            <div className="flex gap-2">
              <button
                onClick={() => setShowUrlInput(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-rose-500/30 rounded-xl text-sm text-zinc-300 hover:text-zinc-100 transition-all group"
              >
                <Link2 size={16} className="text-zinc-500 group-hover:text-rose-400 transition-colors" />
                Paste URL
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 hover:border-rose-500/30 rounded-xl text-sm text-zinc-300 hover:text-zinc-100 transition-all group"
              >
                <Upload size={16} className="text-zinc-500 group-hover:text-rose-400 transition-colors" />
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onUpload?.(file)
                }}
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/movie.mp4"
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700/50 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && url.trim()) {
                    onUrlSubmit?.(url.trim())
                    setUrl('')
                    setShowUrlInput(false)
                  }
                }}
                autoFocus
              />
              <button
                onClick={() => {
                  if (url.trim()) {
                    onUrlSubmit?.(url.trim())
                    setUrl('')
                    setShowUrlInput(false)
                  }
                }}
                disabled={!url.trim()}
                className="px-4 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.25)] disabled:shadow-none"
              >
                Add
              </button>
              <button
                onClick={() => { setShowUrlInput(false); setUrl('') }}
                className="p-3 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {sources.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs text-zinc-500 font-['Space_Grotesk'] uppercase tracking-wider">Recent</p>
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => onSelect?.(source.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-all text-left group border border-transparent hover:border-zinc-700/30"
                >
                  <div className="w-8 h-8 rounded bg-zinc-700/50 flex items-center justify-center shrink-0 group-hover:bg-rose-500/10 transition-colors duration-300">
                    <Film size={14} className="text-zinc-400 group-hover:text-rose-400 transition-colors" />
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 truncate transition-colors">
                    {source.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
