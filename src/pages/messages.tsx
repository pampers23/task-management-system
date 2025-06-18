import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send } from 'lucide-react';


const Messages = () => {

    const [selectedChat, setSelectedChat] = useState(0);
    const [newMessage, setNewMessage] = useState('');

    const conversations = [
      {
        id: 1,
        name: "John Smith",
        lastMessage: "The project looks great! When can we schedule the review?",
        time: "2m ago",
        unread: 2,
        avatar: "JS",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        lastMessage: "I've completed the wireframes for the dashboard",
        time: "1m ago",
        unread: 0,
        avatar: "SJ",
      },
      {
        id: 3,
        name: "Team Alpha",
        lastMessage: "Meeting rescheduled to 3 PM tomorrow",
        time: "2h ago",
        unread: 5,
        avatar: "TA",
      },
      {
        id: 4,
        name: "Mike Chen",
        lastMessage: "Can you review my pull request?",
        time: "1d ago",
        unread: 1,
        avatar: "MC",
      },
    ];


    const messages = [
      {
        id: 1,
        sender: "John Smith",
        content: "Hey, I wanted to discuss the project timeline with you.",
        time: " 10:30 AM",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Sure! I think we're on track to meet the deadline.",
        time: " 10:32 AM",
        isOwn: true
      },
      {
        id: 3,
        sender: "John Smith",
        content: "The project looks great! When can we schedule the review?",
        time: " 10:35 AM",
        isOwn: false
      },
    ];

    const handleSendMessage = () => {
      if (newMessage.trim()) {
        console.log('Sending message:', newMessage);
        setNewMessage('');
      }
    }

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* conversation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b ${
                    selectedChat === index ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{conversation.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                          {conversation.unread > 0 && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* chat area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{conversations[selectedChat]?.avatar}</AvatarFallback>
              </Avatar>
              <span>{conversations[selectedChat]?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* message input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Messages