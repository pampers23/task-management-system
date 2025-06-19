import { LayoutDashboard, CheckSquare, Clock, MessageSquare, Bell, Search, Settings } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";


const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/",
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: CheckSquare,
    },
    {
        title: "Timeline",
        url: "/timeline",
        icon: Clock,
    },
    {
        title: "Messages",
        url: "/messages",
        icon: MessageSquare,
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
    },
    {
        title: "Search",
        url: "/search",
        icon: Search,
    }
]


export const AppSidebar = () => {
    const location = useLocation();

  return (
    <Sidebar>
        <SidebarHeader className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-sidebar-foreground">TaskFlow</h2>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                                    <Link
                                        to={item.url}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/settings'}>
                        <Link to="/settings">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
