import TaskCard from "./task-card"
import type { Task, TaskStatus } from "@/type";

interface TasklistProps {
    tasks: Task[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
    currentFilter: TaskStatus | 'all';
    onFilterChange: (filter: TaskStatus | 'all') => void;
        taskCount: {
        all: number;
        todo: number;
        'in-progress': number;
        completed: number;
    };
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