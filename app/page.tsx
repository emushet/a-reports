"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  CheckSquare,
  Users,
  Bell,
  Search,
  Menu,
  Home,
  ClipboardList,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Dashboard from "./dashboard/page"
import AuditPlan from "./audit-plan/page"
import AuditExecution from "./audit-execution/page"
import Recommendations from "./recommendations/page"
import UserManagement from "./users/page"
import GroupManagement from "./groups/page"
import PermissionManagement from "./permissions/page"

const navigationItems = [
  { id: "dashboard", name: "لوحة التحكم", icon: Home },
  { id: "audit-plan", name: "خطة التدقيق", icon: Calendar },
  { id: "audit-execution", name: "تنفيذ التدقيق", icon: CheckSquare },
  { id: "recommendations", name: "متابعة التوصيات", icon: ClipboardList },
  {
    id: "security",
    name: "الأمان",
    icon: Settings,
    submenu: [
      { id: "users", name: "إدارة المستخدمين", icon: Users },
      { id: "groups", name: "المجموعات", icon: Users },
      { id: "permissions", name: "الصلاحيات", icon: Settings },
    ],
  },
]

export default function AuditSystem() {
  const [activeScreen, setActiveScreen] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard />
      case "audit-plan":
        return <AuditPlan />
      case "audit-execution":
        return <AuditExecution />
      case "recommendations":
        return <Recommendations />
      case "users":
        return <UserManagement />
      case "groups":
        return <GroupManagement />
      case "permissions":
        return <PermissionManagement />
      default:
        return <Dashboard />
    }
  }

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? "w-full" : "w-72"} bg-gradient-to-b from-blue-600 to-blue-700 h-full text-white`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">نظام التدقيق الداخلي</h2>
            <p className="text-blue-100 text-sm">البنك الأهلي</p>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon

              if (item.submenu) {
                return (
                  <li key={item.id}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-4 py-3 text-blue-100 font-medium">
                        <Icon className="w-5 h-5 ml-auto" />
                        <span>{item.name}</span>
                      </div>
                      <ul className="mr-6 space-y-1">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon
                          return (
                            <li key={subItem.id}>
                              <button
                                onClick={() => {
                                  setActiveScreen(subItem.id)
                                  if (mobile) setSidebarOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all duration-200 text-sm ${
                                  activeScreen === subItem.id
                                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                <SubIcon className="w-4 h-4 ml-auto" />
                                <span>{subItem.name}</span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveScreen(item.id)
                      if (mobile) setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all duration-200 ${
                      activeScreen === item.id
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 ml-auto" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-80">
                <Sidebar mobile />
              </SheetContent>
            </Sheet>

            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="البحث..." className="pr-10 w-64 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>أح</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">أحمد محمد</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="ml-2 h-4 w-4" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed top-16 bottom-0 right-0 z-20">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="right" className="p-0 w-80">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 lg:mr-72">
          <main className="p-6 min-h-[calc(100vh-4rem)]">{renderScreen()}</main>
        </div>
      </div>
    </div>
  )
}
