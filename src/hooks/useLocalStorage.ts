// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Initialize state by checking localStorage first
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      // If the item exists, parse it. Otherwise, use the initial fallback value.
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 2. Whenever the state changes, update localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, value])

  // 3. Return the exact same tuple format as standard useState: [state, setState]
  return [value, setValue] as const
}