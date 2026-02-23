// src/Board.tsx
import { useState } from 'react'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { KanbanColumn } from '@/features/board/components/KanbanColumn'
import { TaskCard, type Task } from '@/features/board/components/TaskCard'

// Initial mock data
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Set up Vite & WSL', status: 'done' },
  { id: '2', title: 'Install Tailwind v4', status: 'done' },
  { id: '3', title: 'Configure React Router', status: 'in-progress' },
  { id: '4', title: 'Build Drag and Drop', status: 'todo' },
  { id: '5', title: 'Connect to Supabase DB', status: 'todo' },
]

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  // This function fires the moment the user drops a card
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // If dropped outside a valid column, do nothing
    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    // Update the task's status in our state
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Project Board</h2>
        <p className="text-zinc-500 mt-1">Drag and drop tasks to update their status.</p>
      </div>

      {/* The Context Provider that enables drag-and-drop physics */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 h-full">
          {COLUMNS.map((column) => (
            <KanbanColumn key={column.id} id={column.id} title={column.title}>
              {/* Filter tasks so they render in the correct column */}
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </KanbanColumn>
          ))}
        </div>
      </DndContext>
    </div>
  )
}