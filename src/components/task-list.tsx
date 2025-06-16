import TaskCard from "./task-card"
import type { Task } from "@/type";

interface TasklistProps {
    tasks: Task[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
}


const Tasklist = ({ tasks, onUpdateTask, onDeleteTask }: TasklistProps) => {
  return (
    <div className="space-y-4">
        {tasks.map(task => (
            <TaskCard 
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
            />
        ))}
    </div>
  )
}

export default Tasklist