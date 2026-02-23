// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from './Dashboard'
import Board from './Board'

// 1. Create the client (outside the component so it doesn't recreate on re-renders)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes before refetching
      refetchOnWindowFocus: false, // Prevents annoying refetches when tabbing away
    },
  },
})

function App() {
  return (
    // 2. Wrap your entire app in the Provider
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* 3. Add the DevTools (Only visible in development!) */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  )
}

export default App