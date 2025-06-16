"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Plus, Edit, MoreHorizontal, UserCheck, Shield, Eye, Search, Filter, Mail, Phone } from "lucide-react"

export default function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "أحمد محمد علي",
      email: "ahmed.mohamed@bank.com",
      phone: "+966501234567",
      role: "مدقق رئيسي",
      department: "التدقيق الداخلي",
      status: "نشط",
      lastLogin: "2024-01-15 09:30",
      joinDate: "2023-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "فاطمة أحمد السالم",
      email: "fatima.ahmed@bank.com",
      phone: "+966507654321",
      role: "مشرف تدقيق",
      department: "التدقيق الداخلي",
      status: "نشط",
      lastLogin: "2024-01-15 08:45",
      joinDate: "2023-03-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "محمد علي الحسن",
      email: "mohammed.ali@bank.com",
      phone: "+966509876543",
      role: "مدقق",
      department: "إدارة المخاطر",
      status: "نشط",
      lastLogin: "2024-01-14 16:20",
      joinDate: "2023-06-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "سارة خالد المطيري",
      email: "sara.khalid@bank.com",
      phone: "+966502468135",
      role: "مدير إدارة",
      department: "تقنية المعلومات",
      status: "نشط",
      lastLogin: "2024-01-15 10:15",
      joinDate: "2022-11-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "عبدالله حسن القحطاني",
      email: "abdullah.hassan@bank.com",
      phone: "+966503691472",
      role: "مدقق",
      department: "الائتمان",
      status: "غير نشط",
      lastLogin: "2024-01-10 14:30",
      joinDate: "2023-08-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "نورا عبدالرحمن الزهراني",
      email: "nora.abdulrahman@bank.com",
      phone: "+966508529637",
      role: "مشرف تدقيق",
      department: "العمليات المصرفية",
      status: "نشط",
      lastLogin: "2024-01-15 07:50",
      joinDate: "2023-02-28",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const roles = [
    { value: "مدقق رئيسي", label: "مدقق رئيسي", color: "bg-purple-100 text-purple-800" },
    { value: "مشرف تدقيق", label: "مشرف تدقيق", color: "bg-blue-100 text-blue-800" },
    { value: "مدقق", label: "مدقق", color: "bg-green-100 text-green-800" },
    { value: "مدير إدارة", label: "مدير إدارة", color: "bg-orange-100 text-orange-800" },
  ]

  const getRoleColor = (role: string) => {
    const roleObj = roles.find((r) => r.value === role)
    return roleObj ? roleObj.color : "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    return status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
  }

  const roleCounts = {
    total: users.length,
    active: users.filter((u) => u.status === "نشط").length,
    auditors: users.filter((u) => u.role.includes("مدقق")).length,
    supervisors: users.filter((u) => u.role.includes("مشرف")).length,
    managers: users.filter((u) => u.role.includes("مدير")).length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-2">إدارة المستخدمين والأدوار في نظام التدقيق</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة مستخدم
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>أدخل بيانات المستخدم الجديد</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input id="fullName" placeholder="أدخل الاسم الكامل" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="user@bank.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" placeholder="+966xxxxxxxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">رقم الموظف</Label>
                  <Input id="employeeId" placeholder="أدخل رقم الموظف" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">الدور</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">الإدارة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الإدارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audit">التدقيق الداخلي</SelectItem>
                      <SelectItem value="risk">إدارة المخاطر</SelectItem>
                      <SelectItem value="operations">العمليات المصرفية</SelectItem>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="credit">الائتمان</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور المؤقتة</Label>
                <Input id="password" type="password" placeholder="أدخل كلمة مرور مؤقتة" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>إضافة المستخدم</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roleCounts.total}</p>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roleCounts.active}</p>
                <p className="text-sm text-gray-600">نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roleCounts.auditors}</p>
                <p className="text-sm text-gray-600">مدققون</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roleCounts.supervisors}</p>
                <p className="text-sm text-gray-600">مشرفون</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roleCounts.managers}</p>
                <p className="text-sm text-gray-600">مديرون</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في المستخدمين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="تصفية بالدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                المزيد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            قائمة المستخدمين
          </CardTitle>
          <CardDescription>جميع المستخدمين المسجلين في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">معلومات الاتصال</TableHead>
                  <TableHead className="text-right">الدور</TableHead>
                  <TableHead className="text-right">الإدارة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">آخر دخول</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">انضم في {user.joinDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)} variant="outline">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="ml-2 h-4 w-4" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="ml-2 h-4 w-4" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">إلغاء تفعيل</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
