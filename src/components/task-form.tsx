import { useState } from "react"
import type { TaskPriority } from "@/type"
import { useForm } from "react-hook-form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";


interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee: string;
}

interface TaskFormProps {
    onSubmit: (task: { title: string; description?: string; status: 'todo'; priority: TaskPriority; assignee: string; }) => void;
    onCancel: () => void;
}

const TaskForm = ({ onSubmit, onCancel }: TaskFormProps) => {

  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
    }
  });

  const teamMembers = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Charlie Davis',
    'Diana Prince',
    'Ethan Hunt',
    'Fiona Gallagher',
  ]

  const handleSubmit = (data: TaskFormData) => {
    onSubmit({
      title: data.title,
      description: data.description,
      status: 'todo',
      priority: data.priority,
      assignee: data.assignee,
    });
    form.reset();
    toast.success('Task created successfully!');
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-boder rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 
                      focus:ring-ring resize-none"
                      placeholder="Enter task description (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee"
              rules={{ required: "Assignee is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to *</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          role="combobox"
                          type="button"
                          aria-expanded={open}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2
                          focus:ring-ring flex items-center justify-between text-left"
                        >
                          {field.value || "Select team member" }
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No team member fund.</CommandEmpty>
                            <CommandGroup>
                              {teamMembers.map((member) => (
                                <CommandItem
                                  key={member}
                                  value={member}
                                  onSelect={() => {
                                    field.onChange(member);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === member ? "opacity-100" : "opacity-0"
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
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Meduim</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Add Task
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default TaskForm