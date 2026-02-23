// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from './Dashboard'
import Board from './Board'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route: The Layout */}
        <Route element={<AppLayout />}>
          
          {/* Child Routes: Rendered inside the <Outlet /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App