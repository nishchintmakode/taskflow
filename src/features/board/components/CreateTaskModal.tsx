// src/features/board/components/CreateTaskModal.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Task } from './TaskCard'
import { useState } from 'react'

// 1. Define your Validation Schema using Zod
const taskSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  status: z.enum(['todo', 'in-progress', 'done']),
})

// Infer the TypeScript type directly from the Zod schema
type TaskFormValues = z.infer<typeof taskSchema>

interface CreateTaskModalProps {
  onAddTask: (task: Task) => void
}

export function CreateTaskModal({ onAddTask }: CreateTaskModalProps) {
  const [open, setOpen] = useState(false)

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema), // Connect Zod to RHF
    mode: 'onChange', // Validate as the user types
    defaultValues: {
      title: '',
      status: 'todo',
    },
  })

  // 3. Handle Form Submission
  const onSubmit = (data: TaskFormValues) => {
    // Let the database handle the ID!
    onAddTask({ id: '', title: data.title, status: data.status as 'todo' | 'in-progress' | 'done' }) 
    reset()
    setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Task</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        {/* 4. The Form Element */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Fix navigation bug" 
              {...register('title')} // This single line binds the input to RHF!
              className={errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {/* Error Message */}
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Status Select */}
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <select 
              id="status" 
              {...register('status')}
              className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={!isValid}>
              Add Task
            </Button>
          </div>
          
        </form>
      </DialogContent>
    </Dialog>
  )
}