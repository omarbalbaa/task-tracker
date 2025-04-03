"use client"

import { useState, useEffect } from "react"

interface Task {
  id: number
  text: string
  completed: boolean
}

export function useTasks(initialTasks: Task[] = []) {
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [nextId, setNextId] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Try to load tasks from localStorage
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks) as Task[]
      setTasks(parsedTasks)
      
      const maxId = parsedTasks.reduce((max, task) => Math.max(max, task.id), 0)
      setNextId(maxId + 1)
    } else if (initialTasks.length > 0) {

      localStorage.setItem("tasks", JSON.stringify(initialTasks))
      const maxId = initialTasks.reduce((max, task) => Math.max(max, task.id), 0)
      setNextId(maxId + 1)
    }
    
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  const addTask = (text: string) => {
    if (text.trim() !== "") {
      setTasks([...tasks, { id: nextId, text, completed: false }])
      setNextId(nextId + 1)
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    isLoaded
  }
}