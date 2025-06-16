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
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Plus, Edit, MoreHorizontal, Shield, Search, Filter, UserCheck, Settings } from "lucide-react"

export default function GroupManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const groups = [
    {
      id: 1,
      name: "مدققون رئيسيون",
      description: "مجموعة المدققين الرئيسيين مع صلاحيات كاملة",
      membersCount: 5,
      permissions: ["إنشاء خطط التدقيق", "تعديل التوصيات", "إدارة المستخدمين", "عرض التقارير"],
      status: "نشطة",
      createdDate: "2023-01-15",
      lastModified: "2024-01-10",
    },
    {
      id: 2,
      name: "مشرفو التدقيق",
      description: "مجموعة مشرفي التدقيق مع صلاحيات الإشراف",
      membersCount: 12,
      permissions: ["تنفيذ التدقيق", "متابعة التوصيات", "عرض التقارير"],
      status: "نشطة",
      createdDate: "2023-02-01",
      lastModified: "2024-01-08",
    },
    {
      id: 3,
      name: "مدققون",
      description: "مجموعة المدققين العاديين",
      membersCount: 25,
      permissions: ["تنفيذ التدقيق", "رفع الأدلة", "كتابة التقارير"],
      status: "نشطة",
      createdDate: "2023-01-20",
      lastModified: "2024-01-05",
    },
    {
      id: 4,
      name: "مديرو الإدارات",
      description: "مجموعة مديري الإدارات المختلفة",
      membersCount: 8,
      permissions: ["عرض التقارير", "متابعة التوصيات", "تحديث حالة التوصيات"],
      status: "نشطة",
      createdDate: "2023-03-01",
      lastModified: "2024-01-12",
    },
    {
      id: 5,
      name: "مراجعو الجودة",
      description: "مجموعة مراجعي الجودة والامتثال",
      membersCount: 3,
      permissions: ["مراجعة التقارير", "تقييم الجودة", "عرض جميع البيانات"],
      status: "غير نشطة",
      createdDate: "2023-06-15",
      lastModified: "2023-12-20",
    },
  ]

  const availablePermissions = [
    { id: "create_audit_plans", name: "إنشاء خطط التدقيق", category: "التدقيق" },
    { id: "edit_audit_plans", name: "تعديل خطط التدقيق", category: "التدقيق" },
    { id: "execute_audits", name: "تنفيذ التدقيق", category: "التدقيق" },
    { id: "view_reports", name: "عرض التقارير", category: "التقارير" },
    { id: "create_reports", name: "إنشاء التقارير", category: "التقارير" },
    { id: "manage_recommendations", name: "إدارة التوصيات", category: "التوصيات" },
    { id: "update_recommendation_status", name: "تحديث حالة التوصيات", category: "التوصيات" },
    { id: "manage_users", name: "إدارة المستخدمين", category: "الإدارة" },
    { id: "manage_groups", name: "إدارة المجموعات", category: "الإدارة" },
    { id: "upload_evidence", name: "رفع الأدلة", category: "الأدلة" },
    { id: "quality_review", name: "مراجعة الجودة", category: "الجودة" },
    { id: "view_all_data", name: "عرض جميع البيانات", category: "البيانات" },
  ]

  const getStatusColor = (status: string) => {
    return status === "نشطة" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupStats = {
    total: groups.length,
    active: groups.filter((g) => g.status === "نشطة").length,
    totalMembers: groups.reduce((sum, g) => sum + g.membersCount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المجموعات</h1>
          <p className="text-gray-600 mt-2">إدارة مجموعات المستخدمين والصلاحيات</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إنشاء مجموعة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل المجموعة الجديدة وحدد الصلاحيات</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">اسم المجموعة</Label>
                  <Input id="groupName" placeholder="أدخل اسم المجموعة" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">الحالة</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="active">نشطة</option>
                    <option value="inactive">غير نشطة</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="أدخل وصف المجموعة" rows={3} />
              </div>

              <div className="space-y-4">
                <Label>الصلاحيات</Label>
                <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                  {Object.entries(
                    availablePermissions.reduce(
                      (acc, permission) => {
                        if (!acc[permission.category]) {
                          acc[permission.category] = []
                        }
                        acc[permission.category].push(permission)
                        return acc
                      },
                      {} as Record<string, typeof availablePermissions>,
                    ),
                  ).map(([category, permissions]) => (
                    <div key={category} className="space-y-3 mb-4">
                      <h4 className="font-medium text-gray-900 border-b pb-2">{category}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox id={permission.id} />
                            <Label htmlFor={permission.id} className="text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>إنشاء المجموعة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{groupStats.total}</p>
                <p className="text-sm text-gray-600">إجمالي المجموعات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{groupStats.active}</p>
                <p className="text-sm text-gray-600">مجموعات نشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{groupStats.totalMembers}</p>
                <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  placeholder="البحث في المجموعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              تصفية متقدمة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            قائمة المجموعات
          </CardTitle>
          <CardDescription>جميع مجموعات المستخدمين وصلاحياتها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم المجموعة</TableHead>
                  <TableHead className="text-right">الوصف</TableHead>
                  <TableHead className="text-right">عدد الأعضاء</TableHead>
                  <TableHead className="text-right">الصلاحيات</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">آخر تعديل</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-gray-500">تم الإنشاء: {group.createdDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-700 max-w-xs">{group.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{group.membersCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{group.permissions.length} صلاحية</p>
                        <div className="flex flex-wrap gap-1">
                          {group.permissions.slice(0, 2).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {group.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{group.permissions.length - 2} المزيد
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(group.status)}>{group.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{group.lastModified}</TableCell>
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
                            تعديل المجموعة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="ml-2 h-4 w-4" />
                            إدارة الأعضاء
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="ml-2 h-4 w-4" />
                            إدارة الصلاحيات
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">حذف المجموعة</DropdownMenuItem>
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
