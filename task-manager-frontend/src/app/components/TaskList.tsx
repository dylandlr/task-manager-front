import React from "react";
import { Task } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const getBadgeVariant = (
  status: string
): "outline" | "default" | "secondary" | "destructive" => {
  switch (status) {
    case "completed":
      return "default"; // You can choose an appropriate variant for completed
    case "pending":
      return "secondary"; // Choose a variant for pending
    case "urgent":
      return "destructive"; // Choose a variant for urgent tasks
    default:
      return "outline"; // Fallback variant
  }
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-muted-foreground mb-4">{task.description}</p>
              <Badge variant={getBadgeVariant(task.status)}>
                {task.status}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => onEditTask(task)}
                variant="outline"
                className="mr-2">
                Edit
              </Button>
              <Button
                onClick={() => onDeleteTask(task.id)}
                variant="destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
