import { useState } from 'react'
import { LogOut, User } from 'lucide-react'

interface UserMenuProps {
  user: { name: string; avatarUrl?: string }
  onLogout?: () => void
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center">
            <User size={16} className="text-rose-600 dark:text-rose-400" />
          </div>
        )}
        <span className="text-sm text-zinc-700 dark:text-zinc-300 hidden sm:inline">
          {user.name}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-10 w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-50">
            <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
            </div>
            <button
              onClick={() => {
                onLogout?.()
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
