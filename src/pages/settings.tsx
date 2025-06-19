import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { Input } from "@/components/ui/input"


const Settings = () => {

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        desktop: true,
        tasks: true,
        messages: true
    });

    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe23@gmail.com',
        role: 'Project Manager'
    });

    const handleNotificationChange = (key: string, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    }

    const handleProfileChange = (key: string, value: string) => {
        setProfile(prev => ({ ...prev, [key]: value }));
    }

  return (
    <div className="p-6 space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <SettingsIcon className="w-8 h-8" />
                Settings
            </h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Appearance
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your personal information and profile details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-6">
                            <Avatar className="w-20 h-20">
                                <AvatarFallback className="text-lg">JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <Button variant="outline">Change Photo</Button>
                                <p className="text-sm text-muted-foreground mt-2">
                                    JPG, GIF or PNG. 1MB max
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input 
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => handleProfileChange('name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => handleProfileChange('email', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    value={profile.role}
                                    onChange={(e) => handleProfileChange('role', e.target.value)}
                                />
                            </div>
                        </div>

                        <Button>Save Change</Button>
                    </CardContent>
                </Card>
            </TabsContent>


            <TabsContent value="notifications" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Preference</CardTitle>
                        <CardDescription>
                            Choose how you want to be notified about updates and activities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications via email
                                    </p>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={notifications.email}
                                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="push-notifications">Push Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive push notifications on your devices
                                    </p>
                                </div>
                                <Switch
                                    id="push-notifications"
                                    checked={notifications.push}
                                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="desktop-notifications">Desktop Notification</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show notifications on your desktop
                                    </p>
                                </div>
                                <Switch
                                    id="desktop-notifications"
                                    checked={notifications.desktop}
                                    onCheckedChange={(checked) => handleNotificationChange('desktop', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="task-notifications">Task Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about task status changes
                                    </p>
                                </div>
                                <Switch
                                    id="task-notifications"
                                    checked={notifications.tasks}
                                    onCheckedChange={(checked) => handleNotificationChange('tasks', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="message-notifications">New Messages</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about new messages
                                    </p>
                                </div>
                                <Switch
                                    id="message-notifications"
                                    checked={notifications.messages}
                                    onCheckedChange={(checked) => handleNotificationChange('messages', checked)}
                                />
                            </div>
                        </div>

                        <Button>Save Preferences</Button>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                            Manage you account security and privacy settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                            <Button>Enable 2FA</Button>
                        </div>

                        <Button>Update Password</Button>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
                        <CardDescription>
                            Customize the look and feel of your application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-base">Theme</Label>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Choose your preferred theme
                                </p>
                                <div className="flex space-x-4">
                                    <Button className="outline">Light</Button>
                                    <Button className="outline">Dark</Button>
                                    <Button className="outline">System</Button>
                                </div>
                            </div>

                            <div>
                                <Label className="text-base">Language</Label>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Select your preferred language
                                </p>
                                <div className="flex space-x-4">
                                    <Button className="outline">English</Button>
                                    <Button className="outline">Spanish</Button>
                                    <Button className="outline">French</Button>
                                </div>
                            </div>
                        </div>

                        <Button>Save Appreance</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Settings