// src/Board.tsx
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { KanbanColumn } from '@/features/board/components/KanbanColumn'
import { TaskCard, type Task } from '@/features/board/components/TaskCard'
import { CreateTaskModal } from '@/features/board/components/CreateTaskModal'
import { fetchTasks, updateTaskStatus, createTask } from '@/features/board/api/tasksApi'

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export default function Board() {
  const queryClient = useQueryClient()

  // 1. Fetch tasks from Supabase!
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  // 2. Mutation for Drag and Drop
  const updateStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      // Invalidate the cache to instantly refetch the updated data from Supabase
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // 3. Mutation for Creating a Task
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // Handle Drop Event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']
    
    // Find the task being moved
    const task = tasks.find(t => t.id === taskId)
    
    // Only update if the status actually changed
    if (task && task.status !== newStatus) {
      updateStatusMutation.mutate({ id: taskId, status: newStatus })
    }
  }

  // Handle Form Submission
  const handleAddTask = (newTask: Task) => {
    // Note: We omit the 'id' because Supabase generates the UUID for us now!
    createTaskMutation.mutate({ title: newTask.title, status: newTask.status })
  }

  if (isLoading) return <div className="p-8 text-zinc-500">Loading board from cloud...</div>

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Project Board</h2>
          <p className="text-zinc-500 mt-1">Live database connection via Supabase.</p>
        </div>
        <CreateTaskModal onAddTask={handleAddTask} />
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 h-full">
          {COLUMNS.map((column) => (
            <KanbanColumn key={column.id} id={column.id} title={column.title}>
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