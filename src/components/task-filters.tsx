import type { Task, TaskStatus } from "@/type";
import { Button } from "@/components/ui/button"

interface TaskFiltersProps {
    currentFilter: TaskStatus | 'all';
    onFilterChange: (filter: TaskStatus | 'all') => void;
    taskCount: {
        all: number;
        todo: number;
        'in-progress': number;
        completed: number;
    };
    tasks: Task[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
}


const TaskFilters = ({ currentFilter, onFilterChange, taskCount }: TaskFiltersProps) => {

    const filters = [
        { key: 'all' as const, label: 'All Tasks', count: taskCount.all },
        { key: 'todo' as const, label: 'To Do', count: taskCount.todo },
        { key: 'in-progress' as const, label: 'In Progress', count: taskCount['in-progress']},
        { key: 'completed' as const, label: 'Completed', count: taskCount.completed }
    ]

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {filters.map(filter => (
        <Button 
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentFilter === filter.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover/80'
            }`}
        >
         {filter.label} ({filter.count}) 
        </Button>
      ))}
    </div>
  )
}

export default TaskFilters