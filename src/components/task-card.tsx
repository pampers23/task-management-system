import { useState } from "react";
import { Check, ChevronDown, Trash2, User } from "lucide-react";
import type { Task, TaskStatus } from "@/type";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";


interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

const TaskCard = ({ task, onDelete, onUpdate }: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");
    const [editAssignee, setEditAssignee] = useState(task.assignee || "");
    const [open, setOpen] = useState(false);

    const teamMembers = [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown',
        'Charlie Davis',
        'Diana Prince',
        'Ethan Hunt',
        'Fiona Gallagher',
    ];

    const handleStatusChange = (status: TaskStatus) => {
        onUpdate(task.id, { status });
    }

    const handleSave = () => {
        if (editTitle.trim() && editAssignee) {
            onUpdate(task.id, {
                title: editTitle.trim(),
                description: editDescription.trim() || undefined,
                assignee: editAssignee
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditAssignee(task.assignee || "");
        setIsEditing(false);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-800 border-red-200";
            case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    }

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'completed': return "bg-green-500"
            case 'in-progress': return "bg-blue-500"
            case 'todo': return "bg-gray-300"
            default: return "bg-gray-300"
        }
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                {/* status indicator */}
                <div className="flex flex-col items-center gap-2 pt-1">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(task.status)}`} />
                    <div className="flex flex-col gap-1">
                        <Button
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                task.status === 'todo' ? 'bg-gray-300 border-gray-400' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handleStatusChange('todo')}
                            title="Mark as To Do"
                        />
                        <Button
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                task.status === 'in-progress' ? 'bg-blue-500 border-blue-600' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handleStatusChange('in-progress')}
                            title="Mark as In Progress"
                        />
                        <Button
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                task.status === 'completed' ? 'bg-green-500 border-green-600' : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handleStatusChange('completed')}
                            title="Mark as Completed"
                        />
                    </div>
                </div>

                {/* task content */}
                <div className="flex-1">
                    {isEditing ? (
                        <div className="space-y-3">
                            <Input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Task Title"
                                required
                            />
                            <Textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                placeholder="Task Description"
                                rows={3}
                                required
                            />
                            <Select
                                value={editAssignee}
                                onValueChange={setEditAssignee}
                            >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Assign to..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamMembers.map((member) => (
                                        <SelectItem key={member} value={member}>
                                            {member}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none 
                                        focus:ring-2 focus:ring-ring flex items-center justify-between text-left"
                                    >
                                        {editAssignee || "Select team member"}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start">
                                    <Command>
                                    <CommandInput placeholder="Search team members..." />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup>
                                            {teamMembers.map((member) => (
                                              <CommandItem  
                                                key={member}
                                                value={member}
                                                onSelect={() => {
                                                    setEditAssignee(member);
                                                    setOpen(false);
                                                }}
                                                >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        editAssignee === member ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                             {member}
                                            </CommandItem>
                                            ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <div className="flex gap-2">
                                <Button 
                                    onClick={handleSave}
                                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded 
                                    hover:bg-primary/90 transition-colors"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded
                                    hover:bg-secondary/80 transition-colors"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                            <h3 className={`text-lg font-semibold mb-2 ${task.status === 'completed' ? 
                                'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`text-sm mb-3 ${task.status === 'completed' ? 
                                'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getPriorityColor(task.priority)}`}>
                                    {task.priority} priority
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium
                                rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                                    <User size={12}/>
                                    {task.assignee}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Created {task.createdAt.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* delete button */}
                    {task.status === 'completed' && (
                        <Button 
                            onClick={() => onDelete(task.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete completed task"
                        >
                            <Trash2 size={18} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default TaskCard;