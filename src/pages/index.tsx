import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Tasklist from "@/components/task-list"
import TaskForm from "@/components/task-form"
import TaskFilters from "@/components/task-filters"
import type { Task, TaskStatus } from "@/type"

const Index = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
    const [showForm, setShowForm] = useState(false);

    const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...taskData,
            id: Date.now().toString(),
            createdAt: new Date()
        };
        setTasks(prev => [newTask, ...prev]);
        setShowForm(false);
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
      setTasks(prev => prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
       ));
    };

    const deleteTask = (id: string) => {
      setTasks(prev => prev.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => 
      filter === 'all' ? true : task.status === filter
    );

    const taskCounts = {
      all: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    }

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <p className="text-muted-foreground">Manage and track your tasks</p>
      </div>

      {/* add task button */}
      <div>
        <Button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground
          px-4 py-2 rounded-lg hover:bg-primary/50 transition-colors"
        >
          <Plus size={20} />
          Add New Task
        </Button>
      </div>

      {/* task form */}
      {showForm && (
        <TaskForm
          onSubmit={addTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* filters */}
      <TaskFilters
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCount={taskCounts}
      />

      {/* list */}
      <Tasklist
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCount={taskCounts}
      />

      
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </div>
          {filter === 'all' && (
            <Button
              onClick={() => setShowForm(true)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Create your first task
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Index