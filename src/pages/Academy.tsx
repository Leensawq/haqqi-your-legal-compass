import { motion } from "framer-motion";
import { BookOpen, Play, FileText } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Academy() {
  const { t } = useLanguage();

  const courses = [
    {
      id: "1",
      title: t("academy.course1.title"),
      lessons: 8,
      duration: t("academy.course1.duration"),
      type: "video",
    },
    {
      id: "2",
      title: t("academy.course2.title"),
      lessons: 5,
      duration: t("academy.course2.duration"),
      type: "article",
    },
    {
      id: "3",
      title: t("academy.course3.title"),
      lessons: 3,
      duration: t("academy.course3.duration"),
      type: "video",
    },
  ];

  return (
    <PageLayout title={t("academy.title")}>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-primary/10 p-4 text-center"
        >
          <BookOpen className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-2 font-semibold text-foreground">{t("academy.header")}</h2>
          <p className="mt-1 text-sm text-muted">
            {t("academy.subheader")}
          </p>
        </motion.div>

        {/* Courses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-foreground">{t("academy.availableCourses")}</h2>
          {courses.map((course, index) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full rounded-xl bg-card p-4 text-start shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
                  {course.type === "video" ? (
                    <Play className="h-5 w-5 text-accent-foreground" />
                  ) : (
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.lessons} {t("academy.lessons")}
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
