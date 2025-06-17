import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckSquare, Clock, AlertCircle, TrendingUp } from 'lucide-react';


const Dashboard = () => {

    const stats = [
        {
            title: "Total Tasks",
            value: "24",
            description: "Active tasks in progress",
            icon: CheckSquare,
            color: "text-blue-600"
        },
        {
            title: "Completed Today",
            value: "8",
            description: "Tasks completed today",
            icon: TrendingUp,
            color: "text-green-600"
        },
        {
            title: "Overdue",
            value: "3",
            description: "Tasks past deadline",
            icon: AlertCircle,
            color: "text-red-600"
        },
        {
            title: "In Progress",
            value: "12",
            description: "Currently active tasks",
            icon: Clock,
            color: "text-orange-600"
        }
    ];

  return (
    <div className="p-6 space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your task managment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                </Card>     
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates on your tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm">Task "Design Homepage" completed</p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm">New task "API Integration" created</p>
                                <p className="text-xs text-muted-foreground">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm">Task "Database Setup" in progress</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Deadlins</CardTitle>
                    <CardDescription>Tasks due soon</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Mobile App Testing</p>
                                <p className="text-xs text-muted-foreground">High Priority</p>
                            </div>
                            <div className="text-xs text-red-600">Due Tomorrow</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Client Presentation</p>
                                <p className="text-xs text-muted-foreground">Meidum Priority</p>
                            </div>
                            <div className="text-xs text-orange-600">Due in 3 days</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Code Review</p>
                                <p className="text-xs text-muted-foreground">Low Priority</p>
                            </div>
                            <div className="text-xs text-muted-foreground">Due in 1 week</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Dashboard