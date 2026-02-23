// src/Dashboard.tsx
import { useQuery } from '@tanstack/react-query'
import { fetchMockProjects } from '@/features/projects/api/getProjects'

export default function Dashboard() {
  // The useQuery hook does all the heavy lifting
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'], // A unique key to cache this specific data
    queryFn: fetchMockProjects,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-900 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500 font-semibold">Failed to load projects.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Your Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects?.map((project) => (
          <div 
            key={project.id} 
            className="p-6 bg-white border rounded-xl shadow-sm flex flex-col gap-2"
          >
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-sm text-zinc-500">{project.taskCount} active tasks</p>
            <span className={`text-xs font-medium px-2 py-1 w-fit rounded-full ${
              project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'
            }`}>
              {project.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}