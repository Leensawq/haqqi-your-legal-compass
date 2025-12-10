import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  Phone, 
  ExternalLink, 
  Shield,
  MapPin,
  Clock,
  FileText
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export default function Authority() {
  const navigate = useNavigate();

  return (
    <PageLayout title="الجهة المختصة">
      <div className="space-y-6">
        {/* Main Authority Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header with Badge */}
          <div className="bg-gradient-to-l from-primary/20 to-primary/5 p-6 text-center">
            <div className="w-20 h-20 mx-auto bg-card rounded-2xl shadow-lg flex items-center justify-center mb-4">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-medium">جهة حكومية رسمية</span>
            </div>
            <h2 className="text-xl font-bold text-card-foreground">
              وزارة الموارد البشرية والتنمية الاجتماعية
            </h2>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            <div className="bg-accent/30 rounded-lg p-4">
              <p className="text-sm text-card-foreground text-center leading-relaxed">
                هذه الجهة المسؤولة عن حالتك ويمكنها مساعدتك في حل النزاع مع صاحب العمل
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-input rounded-lg p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">الخط الساخن</p>
                  <p className="text-lg font-bold text-card-foreground" dir="ltr">19911</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-input rounded-lg p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">ساعات العمل</p>
                  <p className="text-sm font-medium text-card-foreground">
                    الأحد - الخميس: 8 صباحاً - 4 مساءً
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-input rounded-lg p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">الموقع</p>
                  <p className="text-sm font-medium text-card-foreground">
                    الرياض - حي الوزارات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <a
            href="https://www.hrsd.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              className="w-full py-6 text-lg font-bold"
              size="lg"
            >
              <ExternalLink className="w-5 h-5 ml-2" />
              الانتقال لمنصة البلاغات
            </Button>
          </a>

          <a
            href="https://www.hrsd.gov.sa/complaint"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              size="lg"
            >
              <FileText className="w-5 h-5 ml-2" />
              تقديم شكوى تأخر أجور
            </Button>
          </a>
        </motion.div>

        {/* Back to Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="w-full text-muted hover:text-foreground"
          >
            العودة للخطوات
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
