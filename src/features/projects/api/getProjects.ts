// src/features/projects/api/getProjects.ts

// Define your TypeScript types
export type Project = {
  id: string;
  name: string;
  taskCount: number;
  status: 'active' | 'completed';
}

// Mock API Call
export const fetchMockProjects = async (): Promise<Project[]> => {
  // Simulate a 1.5-second network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Return fake data
  return [
    { id: '1', name: 'Website Redesign', taskCount: 12, status: 'active' },
    { id: '2', name: 'Mobile App Launch', taskCount: 8, status: 'active' },
    { id: '3', name: 'Database Migration', taskCount: 3, status: 'completed' },
  ];
};