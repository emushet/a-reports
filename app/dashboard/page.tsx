"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, AlertTriangle, Users, CheckCircle, Clock, FileText, Calendar } from "lucide-react"

export default function Dashboard() {
  const kpiData = [
    {
      title: "مهام التدقيق النشطة",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: ClipboardList,
      color: "blue",
    },
    {
      title: "التوصيات المتأخرة",
      value: "8",
      change: "-5%",
      changeType: "negative",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "المستخدمون النشطون",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "green",
    },
    {
      title: "معدل الإنجاز",
      value: "87%",
      change: "+3%",
      changeType: "positive",
      icon: CheckCircle,
      color: "purple",
    },
  ]

  const recentAudits = [
    {
      id: 1,
      title: "تدقيق إدارة المخاطر",
      department: "إدارة المخاطر",
      status: "قيد التنفيذ",
      progress: 65,
      dueDate: "2024-01-15",
      priority: "عالية",
    },
    {
      id: 2,
      title: "مراجعة نظام الائتمان",
      department: "الائتمان",
      status: "مكتمل",
      progress: 100,
      dueDate: "2024-01-10",
      priority: "متوسطة",
    },
    {
      id: 3,
      title: "تدقيق العمليات المصرفية",
      department: "العمليات",
      status: "لم يبدأ",
      progress: 0,
      dueDate: "2024-01-20",
      priority: "منخفضة",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "مراجعة تقرير المخاطر الشهري",
      dueDate: "اليوم",
      priority: "عالية",
    },
    {
      id: 2,
      title: "اجتماع لجنة التدقيق",
      dueDate: "غداً",
      priority: "عالية",
    },
    {
      id: 3,
      title: "تحديث خطة التدقيق السنوية",
      dueDate: "خلال 3 أيام",
      priority: "متوسطة",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800"
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800"
      case "لم يبدأ":
        return "bg-gray-100 text-gray-800"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-600 mt-2">نظرة عامة على أنشطة التدقيق الداخلي</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-${kpi.color}-100`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                  </div>
                  <Badge variant={kpi.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                    {kpi.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Audits */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                عمليات التدقيق الحديثة
              </CardTitle>
              <CardDescription>آخر عمليات التدقيق وحالة تقدمها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAudits.map((audit) => (
                  <div key={audit.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">{audit.title}</h4>
                        <p className="text-sm text-gray-600">{audit.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(audit.priority)}>{audit.priority}</Badge>
                        <Badge className={getStatusColor(audit.status)}>{audit.status}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{audit.progress}%</span>
                      </div>
                      <Progress value={audit.progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ الاستحقاق: {audit.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                المهام القادمة
              </CardTitle>
              <CardDescription>المهام المجدولة للأيام القادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-3 space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{task.dueDate}</span>
                      <Badge className={getPriorityColor(task.priority)} variant="outline">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
