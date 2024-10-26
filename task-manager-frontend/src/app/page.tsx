"use client";

import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, task]);
    setIsFormOpen(false);
  };

  const handleEditTask = (updatedTask: Omit<Task, "id">) => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Task Management App
      </motion.h1>
      <AnimatePresence mode="wait">
        {isFormOpen || editingTask ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <TaskForm
              task={editingTask || undefined}
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2">
              <PlusCircle size={20} />
              Add New Task
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <TaskList
        tasks={tasks}
        onEditTask={(task) => setEditingTask(task)}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
