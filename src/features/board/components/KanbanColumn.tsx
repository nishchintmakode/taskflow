// src/features/board/components/KanbanColumn.tsx
import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'

interface KanbanColumnProps {
  id: string
  title: string
  children: ReactNode
}

export function KanbanColumn({ id, title, children }: KanbanColumnProps) {
  // 1. Initialize the droppable hook with a unique ID
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-zinc-700">{title}</h3>
      </div>
      
      {/* 2. Attach the ref to the container you want to drop things into */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-3 rounded-xl min-h-[500px] transition-colors ${
          isOver ? 'bg-zinc-200/50 border-2 border-dashed border-zinc-400' : 'bg-zinc-100 border-2 border-transparent'
        }`}
      >
        <div className="flex flex-col gap-3">
          {children}
        </div>
      </div>
    </div>
  )
}