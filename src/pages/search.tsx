import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search as SearchIcon, Filter, Calendar, User, CheckSquare } from 'lucide-react';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const searchResults = [
        {
            id: 1,
            type: "task",
            title: 'Design Homepage Layout',
            description: 'Create wireframes and mockups for the new homepage design',
            status: 'completed',
            priority: 'high',
            assignee: 'John Smith',
            dueDate: '2024-01-15',
        },
        {
            id: 2,
            type: "task",
            title: 'API Integration Development',
            description: 'Implement REST API endpoints for user authentication',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Sarah Johnson',
            dueDate: '2024-01-20',
        },
        {
            id: 3,
            type: "message",
            title: 'Project Review Discussion',
            description: 'Message from Mike Chen about the upcoming project review meeting',
            sender: 'Mike Chen',
            timestamp: '2 hours ago'
        },
        {
            id: 4,
            type: "task",
            title: 'Database Migration  Script',
            description: 'Write migration scripts for the new user table structure',
            status: 'todo',
            priority: 'medium',
            assignee: 'Alex Wilson',
            dueDate: '2024-01-25',
        },
    ];

    const filters = [
        { key: 'all', label: 'All Results', icon: SearchIcon },
        { key: 'tasks', label: 'Tasks', icon: CheckSquare },
        { key: 'messages', label: 'Messages', icon: User },
    ];

    const filteredResults = searchResults.filter(result => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'tasks') return result.type === 'task';
        if (selectedFilter === 'messages') return result.type === 'messages';
        return true
    });

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'todo':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800';
        };
    };

    const getPriorityColor = (priority?: string) => {
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
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <SearchIcon className="w-8 h-8" />
                Search
            </h1>
            <p className="text-muted-foreground">Find tasks, messages, and more</p>
        </div>

        {/* search input */}
        <Card>
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search for tasks, messages, people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button className="cursor-pointer">
                        <SearchIcon className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* filter */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5"/>
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <Button
                            key={filter.key}
                            variant={selectedFilter === filter.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedFilter(filter.key)}
                            className="flex items-center gap-2"
                        >
                            <filter.icon className="w-4 h-4" />
                            {filter.label}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* search results */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
                Search Results ({filteredResults.length})
            </h2>

            {filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {result.title}
                                    </h3>
                                    <Badge variant="outline" className="text-xs">
                                        {result.type}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground mb-3">
                                    {result.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                    {result.type === 'task' && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getStatusColor(result.status)}>
                                                    {result.status?.replace('-', '')}
                                                </Badge>
                                                <Badge className={getPriorityColor(result.priority)}>
                                                    {result.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <User className="w-4 h-4" />
                                                {result.assignee}
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                Due: {result.dueDate}
                                            </div>
                                        </>
                                    )}
                                    {result.type === 'message' && (
                                        <>
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <User className="w-4 h-4"/>
                                                From: {result.sender}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}


            {filteredResults.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <SearchIcon className="p-8 text-center" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            No results found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search terms or filters.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  )
}

export default Search