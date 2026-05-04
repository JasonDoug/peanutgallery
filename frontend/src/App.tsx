import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AppShell from './components/shell/AppShell'
import Home from './pages/Home'
import Prompts from './pages/Prompts'
import History from './pages/History'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems = [
    { label: 'Commentary', href: '/', isActive: location.pathname === '/' },
    { label: 'Prompts', href: '/prompts', isActive: location.pathname === '/prompts' },
    { label: 'History', href: '/history', isActive: location.pathname === '/history' },
  ]

  const user = {
    name: 'Jason',
    avatarUrl: 'https://github.com/github.png', // Placeholder
  }

  const handleNavigate = (href: string) => {
    navigate(href)
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Implement logout logic here
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AppShell>
  )
}

export default App
