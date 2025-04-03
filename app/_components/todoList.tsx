"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Plus, X, CheckCircle2, Circle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTasks } from "@/hooks/useTasks" // Import your new hook

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const initialTasks: Task[] = [
    { id: 1, text: "task 1", completed: false },
    { id: 2, text: "task 2", completed: false },
    { id: 3, text: "a completed task", completed: true },
  ]

  const { tasks, addTask, deleteTask, toggleTaskCompletion, isLoaded } = useTasks(initialTasks)
  const [newTask, setNewTask] = useState("")

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask)
      setNewTask("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b border-indigo-200">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
              <ClipboardList className="h-6 w-6 text-indigo-500" />
              My To Do List
              <Badge variant="outline" className="ml-auto bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                {completedCount}/{tasks.length} done
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <AnimatePresence>
              {tasks.length > 0 ? (
                <ul className="space-y-3 mb-6">
                  {tasks.map((task) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <span
                          className={`${task.completed ? "line-through text-gray-400" : "text-gray-700"} transition-all`}
                        >
                          {task.text}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="cursor-pointer opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-gray-400"
                >
                  No tasks yet. Add one below!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <Input
                placeholder="Enter task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-indigo-200 focus-visible:ring-indigo-500"
              />
              <Button onClick={handleAddTask} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 justify-center border-t border-indigo-200 pt-4">
            Click on a task circle to mark it as completed
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}