import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Share2, 
  Edit3,
  User,
  Building2,
  Scale,
  CheckCircle2
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ComplaintGenerator() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "وزارة الموارد البشرية والتنمية الاجتماعية",
    userName: "أحمد محمد العلي",
    userIdNumber: "1XXXXXXXXX",
    employerName: "شركة التقنية المتقدمة",
    complaintDetails: "تأخر صرف الراتب لمدة ثلاثة أشهر متتالية",
    legalReference: "المادة 90 من نظام العمل",
  });

  const handleDownload = () => {
    toast.success("تم تحميل الملف بنجاح");
  };

  const handleShare = () => {
    toast.success("تم نسخ رابط المشاركة");
  };

  return (
    <PageLayout title="نموذج الشكوى">
      <div className="space-y-6">
        {/* Letter Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden"
        >
          {/* Letter Header */}
          <div className="bg-gradient-to-l from-primary/10 to-transparent p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold text-card-foreground">معاينة الخطاب</span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? "إنهاء التعديل" : "تعديل"}
            </button>
          </div>

          {/* Letter Content */}
          <div className="p-5 space-y-4 bg-gradient-to-b from-card to-accent/5">
            {/* To Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Building2 className="w-4 h-4" />
                <span>إلى:</span>
              </div>
              {isEditing ? (
                <Input
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="bg-input border-border"
                />
              ) : (
                <p className="font-semibold text-card-foreground pr-6">
                  {formData.recipientName}
                </p>
              )}
            </div>

            {/* From Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted">
                <User className="w-4 h-4" />
                <span>من:</span>
              </div>
              {isEditing ? (
                <div className="space-y-2 pr-6">
                  <Input
                    placeholder="الاسم"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="bg-input border-border"
                  />
                  <Input
                    placeholder="رقم الهوية"
                    value={formData.userIdNumber}
                    onChange={(e) => setFormData({ ...formData, userIdNumber: e.target.value })}
                    className="bg-input border-border"
                    dir="ltr"
                  />
                </div>
              ) : (
                <div className="pr-6">
                  <p className="font-semibold text-card-foreground">{formData.userName}</p>
                  <p className="text-sm text-muted" dir="ltr">{formData.userIdNumber}</p>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <p className="text-sm text-muted mb-1">الموضوع:</p>
              <p className="font-bold text-card-foreground">
                شكوى تأخر صرف الأجور
              </p>
            </div>

            {/* Body */}
            <div className="space-y-3 text-card-foreground leading-relaxed">
              <p>السلام عليكم ورحمة الله وبركاته،</p>
              <p>
                أتقدم لسعادتكم بشكوى ضد {isEditing ? (
                  <Input
                    value={formData.employerName}
                    onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                    className="inline-block w-48 bg-input border-border mx-1"
                  />
                ) : (
                  <span className="font-semibold text-primary">{formData.employerName}</span>
                )} بخصوص:
              </p>
              <div className="bg-accent/30 rounded-lg p-3">
                {isEditing ? (
                  <Input
                    value={formData.complaintDetails}
                    onChange={(e) => setFormData({ ...formData, complaintDetails: e.target.value })}
                    className="bg-input border-border"
                  />
                ) : (
                  <p className="text-card-foreground">{formData.complaintDetails}</p>
                )}
              </div>
              <p>
                وذلك استناداً إلى {isEditing ? (
                  <Input
                    value={formData.legalReference}
                    onChange={(e) => setFormData({ ...formData, legalReference: e.target.value })}
                    className="inline-block w-56 bg-input border-border mx-1"
                  />
                ) : (
                  <span className="font-semibold text-primary">{formData.legalReference}</span>
                )} الذي يكفل حق العامل في استلام أجره في موعده المحدد.
              </p>
              <p>
                أرجو من سعادتكم النظر في شكواي واتخاذ الإجراءات اللازمة.
              </p>
              <p className="pt-4">وتفضلوا بقبول فائق الاحترام والتقدير،</p>
            </div>

            {/* Signature */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted">التوقيع:</p>
              <p className="font-semibold text-card-foreground">{formData.userName}</p>
              <p className="text-xs text-muted mt-1">
                التاريخ: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            onClick={handleDownload}
            className="py-6 text-base font-bold"
            size="lg"
          >
            <Download className="w-5 h-5 ml-2" />
            تحميل PDF
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="py-6 text-base font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            size="lg"
          >
            <Share2 className="w-5 h-5 ml-2" />
            مشاركة الخطاب
          </Button>
        </motion.div>

        {/* Save Case */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => {
              toast.success("تم حفظ القضية بنجاح");
              navigate("/my-cases");
            }}
            variant="ghost"
            className="w-full py-6 text-muted hover:text-foreground"
          >
            <CheckCircle2 className="w-5 h-5 ml-2" />
            حفظ في قضاياي
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
