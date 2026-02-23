# TaskFlow 📋

A modern, full-stack project management dashboard built to demonstrate enterprise-grade React architecture. 

TaskFlow is a highly interactive Kanban board that separates client-side UI state from server-side data fetching, featuring seamless drag-and-drop, strict form validation, and real-time database persistence.

**https://tflo.vercel.app/**

## ✨ Features

* **Interactive Kanban Board:** Smooth drag-and-drop functionality for task management across different status columns.
* **Live Cloud Persistence:** Tasks are instantly synced to a PostgreSQL database, ensuring data is never lost on refresh.
* **Optimistic UI Updates:** Instant UI feedback during drag-and-drop operations, backed by background server synchronization.
* **Robust Form Validation:** Type-safe task creation forms with real-time error handling.
* **Modern State Architecture:** Clean separation between global UI toggles (sidebar state) and asynchronous server data caching.
* **Fully Responsive UI:** Accessible, mobile-friendly design using utility-first CSS.

## 🛠️ Tech Stack & Architectural Decisions

This project avoids "boilerplate" tools in favor of the modern industry standards used by top engineering teams in 2025/2026:

* **Core:** React 18, TypeScript, Vite
* **Styling & UI:** Tailwind CSS v4, shadcn/ui, Radix UI (Accessible Primitives)
* **Server State & Data Fetching:** TanStack Query (React Query) v5
  * *Why:* To handle complex data synchronization, caching, and loading/error states without cluttering components with `useEffect` and `useState`.
* **Client State Management:** Zustand
  * *Why:* For lightweight, boilerplate-free global state (e.g., sidebar toggling) outside the domain of the database.
* **Complex UI Interactions:** `@dnd-kit/core`
  * *Why:* A modern, headless, and accessible drag-and-drop toolkit that prevents unnecessary DOM re-renders.
* **Forms & Validation:** React Hook Form + Zod
  * *Why:* To minimize uncontrolled component re-renders while enforcing strict, type-safe data schemas before reaching the database.
* **Backend as a Service (BaaS):** Supabase (PostgreSQL)
  * *Why:* To provide a real, cloud-hosted relational database and instant API layer.

## 🗂️ Feature-Driven Architecture

The codebase is organized by feature domains rather than file types, ensuring high scalability and maintainability:

```text
src/
├── components/           # Generic, reusable UI components (shadcn/ui)
├── features/             # Domain-specific logic
│   └── board/            # All Kanban logic (API calls, dnd-kit components, forms)
├── hooks/                # Global utility hooks
├── lib/                  # Third-party configurations (Supabase client)
├── store/                # Global client state (Zustand)
└── types/                # TypeScript interfaces and Zod schemas

🚀 Getting Started (Local Development)
To run this project locally, you will need Node.js installed and a free Supabase account.

1. Clone the repository
```bash
git clone https://www.google.com/search?q=https://github.com/nishchintmakode/taskflow.git
cd taskflow
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment Variables
Create a .env.local file in the root directory and add your Supabase project keys:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

4. Setup the Database
In your Supabase SQL Editor, run the following to create the required table:
```sql
CREATE TABLE tasks (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
title TEXT NOT NULL,
status TEXT NOT NULL CHECK (status IN ('todo', 'in-progress', 'done')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

5. Start the development server
```bash
npm run dev
```

🔮 Future Improvements
Implement Supabase Authentication for user-specific boards.

Add a "Delete Task" feature with a confirmation modal.

Implement Dark Mode using Tailwind and Zustand.