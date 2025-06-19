import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Timeline = () => {

    const timelineEvents = [
        {
            id: 1,
            time: "09:00 AM",
            date: "Today",
            title: "Design Review Meeting",
            description: "Review wireframes and mockups for the new dashboard",
            status: "completed",
            priority: "high",
        },
        {
            id: 2,
            time: "11:30 AM",
            date: "Today",
            title: "API Development",
            description: "Implement user authentication endpoints",
            status: "in-progress",
            priority: "high",
        },
        {
            id: 3,
            time: "02:00 PM",
            date: "Today",
            title: "Client Call",
            description: "Discuss project requirements and timeline",
            status: "upcoming",
            priority: "medium",
        },
        {
            id: 4,
            time: "10:00 AM",
            date: "Tomorrow",
            title: "Code Review",
            description: "Review pull request for the mobile app",
            status: "upcoming",
            priority: "medium",
        },
        {
            id: 5,
            time: "03:00 PM",
            date: "Tomorrow",
            title: "Database Migration",
            description: "Update production database schema",
            status: "upcoming",
            priority: "high",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'upcoming':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-orange-100 text-orange-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

  return (
    <div className="p-6 space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-foreground">Timeline</h1>
            <p className="text-muted-foreground">Track your tasks and events chronologically</p>
        </div>

        <div className="relative">
            <div className="absolute left-8 top-8 bottom-0 w-px bg-border"></div>
            <div className="space-y-6">
                {timelineEvents.map((event) => (
                    <div key={event.id} className="relative flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full border-2 border-background ${
                                event.status === 'completed' ? 'bg-green-500' :
                                event.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{event.title}</CardTitle>
                                        <div className="flex space-x-2">
                                            <Badge
                                                className={getPriorityColor(event.priority)}
                                            >
                                                {event.priority}
                                            </Badge>
                                            <Badge
                                                className={getStatusColor(event.status)}
                                            >
                                                {event.status.replace('-', ' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {event.date} at {event.time}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{event.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Timeline