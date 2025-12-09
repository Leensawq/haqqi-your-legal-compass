import { motion } from "framer-motion";
import { BookOpen, Play, FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: "1",
    title: "مقدمة في نظام العمل السعودي",
    lessons: 8,
    duration: "45 دقيقة",
    type: "فيديو",
  },
  {
    id: "2",
    title: "حقوق المستهلك في التجارة الإلكترونية",
    lessons: 5,
    duration: "30 دقيقة",
    type: "مقال",
  },
  {
    id: "3",
    title: "كيف تكتب شكوى رسمية فعالة",
    lessons: 3,
    duration: "20 دقيقة",
    type: "فيديو",
  },
];

export default function Academy() {
  return (
    <PageLayout title="الأكاديمية">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-primary/10 p-4 text-center"
        >
          <BookOpen className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-2 font-semibold text-foreground">تعلم حقوقك</h2>
          <p className="mt-1 text-sm text-muted">
            دورات ومقالات تعليمية لفهم حقوقك القانونية
          </p>
        </motion.div>

        {/* Courses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-foreground">الدورات المتاحة</h2>
          {courses.map((course, index) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-xl bg-card p-4 text-right shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  {course.type === "فيديو" ? (
                    <Play className="h-5 w-5 text-accent-foreground" />
                  ) : (
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.lessons} دروس
                    </Badge>
                    <span className="text-xs text-muted">{course.duration}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}
