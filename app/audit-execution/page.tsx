"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
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
import { CheckSquare, Upload, FileText, CheckCircle, Camera, Paperclip } from "lucide-react"

export default function AuditExecution() {
  const [selectedAudit, setSelectedAudit] = useState("1")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const activeAudits = [
    {
      id: "1",
      title: "تدقيق إدارة المخاطر",
      department: "إدارة المخاطر",
      progress: 65,
      dueDate: "2024-01-15",
      riskLevel: "عالية",
    },
    {
      id: "2",
      title: "مراجعة العمليات المصرفية",
      department: "العمليات",
      progress: 30,
      dueDate: "2024-01-20",
      riskLevel: "متوسطة",
    },
  ]

  const checklistItems = [
    {
      id: 1,
      category: "السياسات والإجراءات",
      items: [
        { id: 11, text: "مراجعة سياسة إدارة المخاطر المحدثة", completed: true, risk: "منخفضة" },
        { id: 12, text: "التحقق من إجراءات تقييم المخاطر", completed: true, risk: "متوسطة" },
        { id: 13, text: "مراجعة آليات الرقابة الداخلية", completed: false, risk: "عالية" },
        { id: 14, text: "فحص تقارير المخاطر الدورية", completed: false, risk: "متوسطة" },
      ],
    },
    {
      id: 2,
      category: "الأنظمة والتقنية",
      items: [
        { id: 21, text: "اختبار أنظمة إدارة المخاطر", completed: false, risk: "عالية" },
        { id: 22, text: "مراجعة أمان البيانات", completed: false, risk: "عالية" },
        { id: 23, text: "فحص النسخ الاحتياطية", completed: true, risk: "متوسطة" },
      ],
    },
    {
      id: 3,
      category: "الامتثال والتنظيم",
      items: [
        { id: 31, text: "مراجعة الامتثال للوائح البنك المركزي", completed: false, risk: "عالية" },
        { id: 32, text: "فحص تقارير الامتثال", completed: true, risk: "متوسطة" },
        { id: 33, text: "مراجعة سجلات التدريب", completed: false, risk: "منخفضة" },
      ],
    },
  ]

  const evidenceFiles = [
    {
      id: 1,
      name: "سياسة_إدارة_المخاطر_2024.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2024-01-10",
      category: "سياسات",
    },
    {
      id: 2,
      name: "تقرير_تقييم_المخاطر.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadDate: "2024-01-12",
      category: "تقارير",
    },
    {
      id: 3,
      name: "صورة_شاشة_النظام.png",
      type: "صورة",
      size: "856 KB",
      uploadDate: "2024-01-13",
      category: "أدلة",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "عالية":
        return "bg-red-100 text-red-800 border-red-200"
      case "متوسطة":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "منخفضة":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-500" />
      case "Excel":
        return <FileText className="w-5 h-5 text-green-500" />
      case "صورة":
        return <Camera className="w-5 h-5 text-blue-500" />
      default:
        return <Paperclip className="w-5 h-5 text-gray-500" />
    }
  }

  const currentAudit = activeAudits.find((audit) => audit.id === selectedAudit)
  const completedItems = checklistItems.reduce(
    (total, category) => total + category.items.filter((item) => item.completed).length,
    0,
  )
  const totalItems = checklistItems.reduce((total, category) => total + category.items.length, 0)
  const completionPercentage = Math.round((completedItems / totalItems) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تنفيذ التدقيق</h1>
          <p className="text-gray-600 mt-2">تنفيذ ومتابعة عمليات التدقيق النشطة</p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedAudit} onValueChange={setSelectedAudit}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="اختر عملية التدقيق" />
            </SelectTrigger>
            <SelectContent>
              {activeAudits.map((audit) => (
                <SelectItem key={audit.id} value={audit.id}>
                  {audit.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Audit Overview */}
      {currentAudit && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentAudit.title}</CardTitle>
                <CardDescription>{currentAudit.department}</CardDescription>
              </div>
              <Badge className={getRiskColor(currentAudit.riskLevel)}>مخاطر {currentAudit.riskLevel}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">التقدم الإجمالي</span>
                  <span className="text-sm text-gray-600">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">المهام المكتملة</span>
                <div className="text-2xl font-bold text-green-600">
                  {completedItems}/{totalItems}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">تاريخ الاستحقاق</span>
                <div className="text-lg font-semibold text-orange-600">{currentAudit.dueDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checklist" className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            قائمة المراجعة
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            الأدلة والمرفقات
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            الملاحظات والتقارير
          </TabsTrigger>
        </TabsList>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-6">
          {checklistItems.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Checkbox checked={item.completed} className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                            {item.text}
                          </p>
                          <Badge className={getRiskColor(item.risk)} variant="outline">
                            {item.risk}
                          </Badge>
                        </div>
                        {item.completed && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>مكتمل</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Evidence Tab */}
        <TabsContent value="evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>الأدلة والمرفقات</CardTitle>
                  <CardDescription>رفع وإدارة الأدلة المطلوبة للتدقيق</CardDescription>
                </div>

                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      رفع ملف
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>رفع دليل جديد</DialogTitle>
                      <DialogDescription>اختر الملف وأدخل التفاصيل المطلوبة</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="file">الملف</Label>
                        <Input id="file" type="file" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">الفئة</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفئة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="policies">سياسات</SelectItem>
                            <SelectItem value="reports">تقارير</SelectItem>
                            <SelectItem value="evidence">أدلة</SelectItem>
                            <SelectItem value="screenshots">لقطات شاشة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">الوصف</Label>
                        <Textarea id="description" placeholder="أدخل وصف للملف" rows={3} />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={() => setUploadDialogOpen(false)}>رفع الملف</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evidenceFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.uploadDate}</span>
                        <span>•</span>
                        <Badge variant="outline">{file.category}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        تحميل
                      </Button>
                      <Button variant="ghost" size="sm">
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات التدقيق</CardTitle>
              <CardDescription>تسجيل الملاحظات والنتائج أثناء عملية التدقيق</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea placeholder="أدخل ملاحظاتك هنا..." rows={6} />
                <div className="flex justify-between">
                  <Button variant="outline">حفظ كمسودة</Button>
                  <Button>حفظ الملاحظات</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الملاحظات المحفوظة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">ملاحظة حول سياسة المخاطر</span>
                    <span className="text-sm text-gray-500">2024-01-10</span>
                  </div>
                  <p className="text-gray-700">
                    تم العثور على بعض النقاط التي تحتاج إلى تحديث في سياسة إدارة المخاطر الحالية...
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">نتائج اختبار النظام</span>
                    <span className="text-sm text-gray-500">2024-01-12</span>
                  </div>
                  <p className="text-gray-700">أظهرت اختبارات النظام وجود بعض نقاط الضعف في آليات الرقابة...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
