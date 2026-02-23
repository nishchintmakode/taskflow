// src/features/board/api/tasksApi.ts
import { supabase } from '@/lib/supabase'
import type { Task } from '../components/TaskCard'

// GET: Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data || []
}

// POST: Add a new task
export const createTask = async (task: Omit<Task, 'id'>) => {
  const { data, error } = await supabase.from('tasks').insert([task]).select().single()
  if (error) throw new Error(error.message)
  return data
}

// PATCH: Update a task's status (for drag-and-drop)
export const updateTaskStatus = async ({ id, status }: { id: string; status: Task['status'] }) => {
  const { data, error } = await supabase.from('tasks').update({ status }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}