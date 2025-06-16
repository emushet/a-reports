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
import { Plus, Edit, Eye, Calendar, Filter, Download, Search } from "lucide-react"

export default function AuditPlan() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const auditPlans = [
    {
      id: 1,
      title: "خطة التدقيق السنوية 2024",
      type: "سنوية",
      department: "جميع الإدارات",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "نشطة",
      progress: 45,
      tasksCount: 24,
      completedTasks: 11,
    },
    {
      id: 2,
      title: "مراجعة الربع الأول - إدارة المخاطر",
      type: "ربعية",
      department: "إدارة المخاطر",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "مكتملة",
      progress: 100,
      tasksCount: 8,
      completedTasks: 8,
    },
    {
      id: 3,
      title: "تدقيق العمليات المصرفية Q2",
      type: "ربعية",
      department: "العمليات المصرفية",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      status: "قيد التنفيذ",
      progress: 65,
      tasksCount: 12,
      completedTasks: 8,
    },
    {
      id: 4,
      title: "مراجعة أنظمة تقنية المعلومات",
      type: "خاصة",
      department: "تقنية المعلومات",
      startDate: "2024-02-15",
      endDate: "2024-04-15",
      status: "مجدولة",
      progress: 0,
      tasksCount: 15,
      completedTasks: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشطة":
        return "bg-blue-100 text-blue-800"
      case "مكتملة":
        return "bg-green-100 text-green-800"
      case "قيد التنفيذ":
        return "bg-yellow-100 text-yellow-800"
      case "مجدولة":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "سنوية":
        return "bg-purple-100 text-purple-800"
      case "ربعية":
        return "bg-orange-100 text-orange-800"
      case "خاصة":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPlans = auditPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة خطط التدقيق</h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع خطط التدقيق السنوية والربعية</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إنشاء خطة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء خطة تدقيق جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل خطة التدقيق الجديدة</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الخطة</Label>
                  <Input id="title" placeholder="أدخل عنوان الخطة" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الخطة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخطة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">سنوية</SelectItem>
                      <SelectItem value="quarterly">ربعية</SelectItem>
                      <SelectItem value="special">خاصة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">الإدارة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الإدارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الإدارات</SelectItem>
                      <SelectItem value="risk">إدارة المخاطر</SelectItem>
                      <SelectItem value="operations">العمليات المصرفية</SelectItem>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="credit">الائتمان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">الأولوية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="low">منخفضة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ البداية</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">تاريخ النهاية</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="أدخل وصف مفصل للخطة" rows={3} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>إنشاء الخطة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  placeholder="البحث في الخطط..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                تصفية
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            خطط التدقيق
          </CardTitle>
          <CardDescription>جميع خطط التدقيق المجدولة والمكتملة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">عنوان الخطة</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">الإدارة</TableHead>
                  <TableHead className="text-right">الفترة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">التقدم</TableHead>
                  <TableHead className="text-right">المهام</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.title}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(plan.type)} variant="outline">
                        {plan.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.department}</TableCell>
                    <TableCell className="text-sm">
                      <div>
                        <div>{plan.startDate}</div>
                        <div className="text-gray-500">إلى {plan.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{plan.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {plan.completedTasks}/{plan.tasksCount}
                        </div>
                        <div className="text-gray-500">مكتملة</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
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
