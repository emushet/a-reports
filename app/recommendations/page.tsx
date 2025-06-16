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
import {
  ClipboardList,
  Plus,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react"

export default function Recommendations() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const recommendations = [
    {
      id: 1,
      title: "تحديث سياسة إدارة المخاطر",
      description: "يجب تحديث سياسة إدارة المخاطر لتتماشى مع المعايير الجديدة",
      auditTitle: "تدقيق إدارة المخاطر",
      department: "إدارة المخاطر",
      assignedTo: "أحمد محمد",
      priority: "عالية",
      status: "لم تبدأ",
      dueDate: "2024-02-15",
      createdDate: "2024-01-10",
      progress: 0,
      riskLevel: "عالية",
    },
    {
      id: 2,
      title: "تعزيز أنظمة الرقابة الداخلية",
      description: "تطوير آليات رقابة إضافية لضمان الامتثال للسياسات",
      auditTitle: "تدقيق العمليات المصرفية",
      department: "العمليات",
      assignedTo: "فاطمة أحمد",
      priority: "متوسطة",
      status: "قيد التنفيذ",
      dueDate: "2024-02-28",
      createdDate: "2024-01-05",
      progress: 45,
      riskLevel: "متوسطة",
    },
    {
      id: 3,
      title: "تدريب الموظفين على الإجراءات الجديدة",
      description: "إجراء دورات تدريبية شاملة للموظفين على الإجراءات المحدثة",
      auditTitle: "مراجعة الموارد البشرية",
      department: "الموارد البشرية",
      assignedTo: "محمد علي",
      priority: "منخفضة",
      status: "مكتملة",
      dueDate: "2024-01-30",
      createdDate: "2023-12-15",
      progress: 100,
      riskLevel: "منخفضة",
    },
    {
      id: 4,
      title: "تحسين أمان أنظمة المعلومات",
      description: "تطبيق إجراءات أمان إضافية لحماية البيانات الحساسة",
      auditTitle: "تدقيق تقنية المعلومات",
      department: "تقنية المعلومات",
      assignedTo: "سارة خالد",
      priority: "عالية",
      status: "قيد التنفيذ",
      dueDate: "2024-02-10",
      createdDate: "2024-01-08",
      progress: 70,
      riskLevel: "عالية",
    },
    {
      id: 5,
      title: "مراجعة عمليات الائتمان",
      description: "إعادة تقييم إجراءات منح الائتمان وآليات التقييم",
      auditTitle: "تدقيق الائتمان",
      department: "الائتمان",
      assignedTo: "عبدالله حسن",
      priority: "متوسطة",
      status: "متأخرة",
      dueDate: "2024-01-25",
      createdDate: "2023-12-20",
      progress: 25,
      riskLevel: "عالية",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة":
        return "bg-green-100 text-green-800"
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800"
      case "لم تبدأ":
        return "bg-gray-100 text-gray-800"
      case "متأخرة":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "bg-red-100 text-red-800"
      case "متوسطة":
        return "bg-yellow-100 text-yellow-800"
      case "منخفضة":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "عالية":
        return "bg-red-100 text-red-800"
      case "متوسطة":
        return "bg-yellow-100 text-yellow-800"
      case "منخفضة":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rec.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    total: recommendations.length,
    completed: recommendations.filter((r) => r.status === "مكتملة").length,
    inProgress: recommendations.filter((r) => r.status === "قيد التنفيذ").length,
    notStarted: recommendations.filter((r) => r.status === "لم تبدأ").length,
    overdue: recommendations.filter((r) => r.status === "متأخرة").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">متابعة التوصيات</h1>
          <p className="text-gray-600 mt-2">تتبع وإدارة تنفيذ توصيات التدقيق</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة توصية
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة توصية جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل التوصية الجديدة</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان التوصية</Label>
                <Input id="title" placeholder="أدخل عنوان التوصية" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="أدخل وصف مفصل للتوصية" rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">الإدارة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الإدارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risk">إدارة المخاطر</SelectItem>
                      <SelectItem value="operations">العمليات</SelectItem>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="credit">الائتمان</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">المسؤول</Label>
                  <Input id="assignedTo" placeholder="اسم المسؤول" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="riskLevel">مستوى المخاطر</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="مستوى المخاطر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="low">منخفضة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>إضافة التوصية</Button>
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
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
                <p className="text-sm text-gray-600">إجمالي التوصيات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.completed}</p>
                <p className="text-sm text-gray-600">مكتملة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.inProgress}</p>
                <p className="text-sm text-gray-600">قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.notStarted}</p>
                <p className="text-sm text-gray-600">لم تبدأ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statusCounts.overdue}</p>
                <p className="text-sm text-gray-600">متأخرة</p>
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
                  placeholder="البحث في التوصيات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="تصفية بالحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="مكتملة">مكتملة</SelectItem>
                  <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                  <SelectItem value="لم تبدأ">لم تبدأ</SelectItem>
                  <SelectItem value="متأخرة">متأخرة</SelectItem>
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

      {/* Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            قائمة التوصيات
          </CardTitle>
          <CardDescription>جميع توصيات التدقيق وحالة تنفيذها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التوصية</TableHead>
                  <TableHead className="text-right">الإدارة</TableHead>
                  <TableHead className="text-right">المسؤول</TableHead>
                  <TableHead className="text-right">الأولوية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">التقدم</TableHead>
                  <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecommendations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{rec.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{rec.description}</p>
                        <Badge className={getRiskColor(rec.riskLevel)} variant="outline">
                          مخاطر {rec.riskLevel}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{rec.department}</TableCell>
                    <TableCell>{rec.assignedTo}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(rec.priority)} variant="outline">
                        {rec.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rec.status)}>{rec.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{rec.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${rec.progress}%` }}></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className={rec.status === "متأخرة" ? "text-red-600 font-medium" : ""}>{rec.dueDate}</span>
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
