// src/components/layout/AppLayout.tsx
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/useUIStore'

export default function AppLayout() {
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div className="flex h-screen w-full bg-zinc-50">
      
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-zinc-900 text-white p-4 flex flex-col gap-4 transition-all duration-300">
          <h1 className="font-bold text-xl mb-4">TaskFlow</h1>
          <nav className="flex flex-col gap-2">
            <Link className="hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800" to="/">Dashboard</Link>
            <Link className="hover:text-zinc-300 px-2 py-1 rounded hover:bg-zinc-800" to="/board">Board</Link>
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b bg-white flex items-center px-4 shadow-sm z-10">
          <Button variant="outline" size="sm" onClick={toggleSidebar}>
            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </Button>
        </header>
        
        {/* Dynamic Page Content goes here! */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet /> 
        </div>
      </main>

    </div>
  )
}