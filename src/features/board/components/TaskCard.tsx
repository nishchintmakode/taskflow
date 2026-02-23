// src/features/board/components/TaskCard.tsx
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
}

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  // 1. Initialize the draggable hook with the task's unique ID
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status } // We pass the current status so we know where it came from
  })

  // 2. Apply the CSS transform coordinates as the user drags the mouse
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white rounded-lg shadow-sm border border-zinc-200 cursor-grab hover:border-zinc-300 active:cursor-grabbing ${
        isDragging ? 'opacity-50 z-50 shadow-lg scale-105' : 'opacity-100'
      }`}
    >
      <p className="text-sm font-medium text-zinc-700">{task.title}</p>
    </div>
  )
}