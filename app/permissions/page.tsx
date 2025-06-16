"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Shield,
  Plus,
  Edit,
  MoreHorizontal,
  Search,
  Filter,
  Lock,
  Unlock,
  Eye,
  FileText,
  Users,
  Settings,
  Database,
} from "lucide-react"

export default function PermissionManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const permissions = [
    {
      id: 1,
      name: "إنشاء خطط التدقيق",
      code: "CREATE_AUDIT_PLANS",
      description: "السماح بإنشاء وتصميم خطط التدقيق السنوية والربعية",
      category: "التدقيق",
      level: "عالي",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون"],
      assignedUsers: 5,
      createdDate: "2023-01-15",
      lastModified: "2024-01-10",
    },
    {
      id: 2,
      name: "تعديل خطط التدقيق",
      code: "EDIT_AUDIT_PLANS",
      description: "السماح بتعديل وتحديث خطط التدقيق الموجودة",
      category: "التدقيق",
      level: "عالي",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون", "مشرفو التدقيق"],
      assignedUsers: 17,
      createdDate: "2023-01-15",
      lastModified: "2024-01-08",
    },
    {
      id: 3,
      name: "تنفيذ التدقيق",
      code: "EXECUTE_AUDITS",
      description: "السماح بتنفيذ عمليات التدقيق وملء قوائم المراجعة",
      category: "التدقيق",
      level: "متوسط",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون", "مشرفو التدقيق", "مدققون"],
      assignedUsers: 42,
      createdDate: "2023-01-20",
      lastModified: "2024-01-05",
    },
    {
      id: 4,
      name: "عرض التقارير",
      code: "VIEW_REPORTS",
      description: "السماح بعرض وقراءة تقارير التدقيق",
      category: "التقارير",
      level: "منخفض",
      status: "نشط",
      assignedGroups: ["جميع المجموعات"],
      assignedUsers: 53,
      createdDate: "2023-01-15",
      lastModified: "2024-01-12",
    },
    {
      id: 5,
      name: "إنشاء التقارير",
      code: "CREATE_REPORTS",
      description: "السماح بإنشاء وكتابة تقارير التدقيق",
      category: "التقارير",
      level: "عالي",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون", "مشرفو التدقيق"],
      assignedUsers: 17,
      createdDate: "2023-02-01",
      lastModified: "2024-01-09",
    },
    {
      id: 6,
      name: "إدارة المستخدمين",
      code: "MANAGE_USERS",
      description: "السماح بإضافة وتعديل وحذف المستخدمين",
      category: "الإدارة",
      level: "عالي جداً",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون"],
      assignedUsers: 5,
      createdDate: "2023-01-15",
      lastModified: "2024-01-11",
    },
    {
      id: 7,
      name: "رفع الأدلة",
      code: "UPLOAD_EVIDENCE",
      description: "السماح برفع وإدارة أدلة التدقيق والمستندات",
      category: "الأدلة",
      level: "متوسط",
      status: "نشط",
      assignedGroups: ["مدققون رئيسيون", "مشرفو التدقيق", "مدققون"],
      assignedUsers: 42,
      createdDate: "2023-01-20",
      lastModified: "2024-01-07",
    },
    {
      id: 8,
      name: "مراجعة الجودة",
      code: "QUALITY_REVIEW",
      description: "السماح بمراجعة وتقييم جودة عمليات التدقيق",
      category: "الجودة",
      level: "عالي",
      status: "غير نشط",
      assignedGroups: ["مراجعو الجودة"],
      assignedUsers: 3,
      createdDate: "2023-06-15",
      lastModified: "2023-12-20",
    },
  ]

  const permissionCategories = [
    { value: "التدقيق", label: "التدقيق", icon: Shield, color: "bg-blue-100 text-blue-800" },
    { value: "التقارير", label: "التقارير", icon: FileText, color: "bg-green-100 text-green-800" },
    { value: "الإدارة", label: "الإدارة", icon: Settings, color: "bg-purple-100 text-purple-800" },
    { value: "الأدلة", label: "الأدلة", icon: Database, color: "bg-orange-100 text-orange-800" },
    { value: "الجودة", label: "الجودة", icon: Eye, color: "bg-indigo-100 text-indigo-800" },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "عالي جداً":
        return "bg-red-100 text-red-800 border-red-200"
      case "عالي":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "متوسط":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "منخفض":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getCategoryColor = (category: string) => {
    const cat = permissionCategories.find((c) => c.value === category)
    return cat ? cat.color : "bg-gray-100 text-gray-800"
  }

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || permission.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const permissionStats = {
    total: permissions.length,
    active: permissions.filter((p) => p.status === "نشط").length,
    highLevel: permissions.filter((p) => p.level === "عالي" || p.level === "عالي جداً").length,
    categories: permissionCategories.length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الصلاحيات</h1>
          <p className="text-gray-600 mt-2">إدارة وتحديد صلاحيات النظام والوصول</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة صلاحية جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة صلاحية جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل الصلاحية الجديدة</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permissionName">اسم الصلاحية</Label>
                  <Input id="permissionName" placeholder="أدخل اسم الصلاحية" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permissionCode">رمز الصلاحية</Label>
                  <Input id="permissionCode" placeholder="PERMISSION_CODE" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="أدخل وصف مفصل للصلاحية" rows={3} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">الفئة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">مستوى الصلاحية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفض</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="high">عالي</SelectItem>
                      <SelectItem value="critical">عالي جداً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">الحالة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>إضافة الصلاحية</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{permissionStats.total}</p>
                <p className="text-sm text-gray-600">إجمالي الصلاحيات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Unlock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{permissionStats.active}</p>
                <p className="text-sm text-gray-600">صلاحيات نشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{permissionStats.highLevel}</p>
                <p className="text-sm text-gray-600">صلاحيات عالية المستوى</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{permissionStats.categories}</p>
                <p className="text-sm text-gray-600">فئات الصلاحيات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="permissions">إدارة الصلاحيات</TabsTrigger>
          <TabsTrigger value="categories">فئات الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions" className="space-y-6">
          {/* Search and Filter */}
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
                      placeholder="البحث في الصلاحيات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="تصفية بالفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      {permissionCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
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

          {/* Permissions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                قائمة الصلاحيات
              </CardTitle>
              <CardDescription>جميع صلاحيات النظام ومستويات الوصول</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم الصلاحية</TableHead>
                      <TableHead className="text-right">الرمز</TableHead>
                      <TableHead className="text-right">الفئة</TableHead>
                      <TableHead className="text-right">المستوى</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المستخدمون</TableHead>
                      <TableHead className="text-right">آخر تعديل</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{permission.name}</p>
                            <p className="text-sm text-gray-600 max-w-xs">{permission.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{permission.code}</code>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(permission.category)} variant="outline">
                            {permission.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(permission.level)} variant="outline">
                            {permission.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(permission.status)}>{permission.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{permission.assignedUsers}</span>
                            </div>
                            <div className="text-xs text-gray-500">{permission.assignedGroups.length} مجموعة</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{permission.lastModified}</TableCell>
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
                                <Edit className="ml-2 h-4 w-4" />
                                تعديل الصلاحية
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="ml-2 h-4 w-4" />
                                عرض المستخدمين
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">حذف الصلاحية</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permissionCategories.map((category) => {
              const Icon = category.icon
              const categoryPermissions = permissions.filter((p) => p.category === category.value)

              return (
                <Card key={category.value}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${category.color.replace("text-", "text-").replace("bg-", "bg-")}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.label}</CardTitle>
                        <CardDescription>{categoryPermissions.length} صلاحية</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoryPermissions.slice(0, 3).map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{permission.name}</span>
                          <Badge className={getLevelColor(permission.level)} variant="outline">
                            {permission.level}
                          </Badge>
                        </div>
                      ))}
                      {categoryPermissions.length > 3 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{categoryPermissions.length - 3} صلاحية أخرى
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
