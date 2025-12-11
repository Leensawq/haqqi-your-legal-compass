import { useState, useEffect } from "react";
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

interface ComplaintLetter {
  recipient: string;
  subject: string;
  body: string;
  legalReference: string;
}

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
    complaintBody: "",
  });

  // Load AI-generated letter from localStorage
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('caseAnalysis');
    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis);
        const letter: ComplaintLetter = analysis.complaintLetter;
        if (letter) {
          setFormData(prev => ({
            ...prev,
            recipientName: letter.recipient || prev.recipientName,
            complaintDetails: letter.subject || prev.complaintDetails,
            legalReference: letter.legalReference || prev.legalReference,
            complaintBody: letter.body || "",
          }));
        }
      } catch (e) {
        console.error('Failed to parse letter:', e);
      }
    }
  }, []);

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
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Letter Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold text-gray-900">معاينة الخطاب</span>
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
          <div className="p-5 space-y-4 bg-white">
            {/* To Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>إلى:</span>
              </div>
              {isEditing ? (
                <Input
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              ) : (
                <p className="font-semibold text-gray-900 pr-6">
                  {formData.recipientName}
                </p>
              )}
            </div>

            {/* From Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>من:</span>
              </div>
              {isEditing ? (
                <div className="space-y-2 pr-6">
                  <Input
                    placeholder="الاسم"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="bg-gray-50 border-gray-300 text-gray-900"
                  />
                  <Input
                    placeholder="رقم الهوية"
                    value={formData.userIdNumber}
                    onChange={(e) => setFormData({ ...formData, userIdNumber: e.target.value })}
                    className="bg-gray-50 border-gray-300 text-gray-900"
                    dir="ltr"
                  />
                </div>
              ) : (
                <div className="pr-6">
                  <p className="font-semibold text-gray-900">{formData.userName}</p>
                  <p className="text-sm text-gray-600" dir="ltr">{formData.userIdNumber}</p>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">الموضوع:</p>
              <p className="font-bold text-gray-900">
                شكوى تأخر صرف الأجور
              </p>
            </div>

            {/* Body */}
            <div className="space-y-3 text-gray-800 leading-relaxed">
              <p>السلام عليكم ورحمة الله وبركاته،</p>
              <p>
                أتقدم لسعادتكم بشكوى ضد {isEditing ? (
                  <Input
                    value={formData.employerName}
                    onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                    className="inline-block w-48 bg-gray-50 border-gray-300 text-gray-900 mx-1"
                  />
                ) : (
                  <span className="font-semibold text-primary">{formData.employerName}</span>
                )} بخصوص:
              </p>
              <div className="bg-gray-100 rounded-lg p-3">
                {isEditing ? (
                  <Input
                    value={formData.complaintDetails}
                    onChange={(e) => setFormData({ ...formData, complaintDetails: e.target.value })}
                    className="bg-gray-50 border-gray-300 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-800">{formData.complaintDetails}</p>
                )}
              </div>
              <p>
                وذلك استناداً إلى {isEditing ? (
                  <Input
                    value={formData.legalReference}
                    onChange={(e) => setFormData({ ...formData, legalReference: e.target.value })}
                    className="inline-block w-56 bg-gray-50 border-gray-300 text-gray-900 mx-1"
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
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">التوقيع:</p>
              <p className="font-semibold text-gray-900">{formData.userName}</p>
              <p className="text-xs text-gray-500 mt-1">
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
