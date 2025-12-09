import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Globe, Shield, Trash2, LogOut } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [language, setLanguage] = useState("ar");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "تنبيه",
      description: "هل أنت متأكد من حذف حسابك؟",
      variant: "destructive",
    });
  };

  return (
    <PageLayout title="حسابي">
      <div className="space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-3 text-lg font-semibold text-foreground">مستخدم حقي</h2>
          <p className="text-sm text-muted">user@example.com</p>
        </motion.div>

        {/* Login/Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button className="w-full py-4 font-semibold" size="lg">
            تسجيل الدخول / إنشاء حساب
          </Button>
        </motion.div>

        <Separator />

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-foreground">المعلومات الشخصية</h3>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input placeholder="الاسم الكامل" className="pr-10 bg-card" />
            </div>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input placeholder="رقم الجوال" className="pr-10 bg-card" dir="ltr" />
            </div>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input placeholder="البريد الإلكتروني" className="pr-10 bg-card" dir="ltr" />
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-foreground">الإعدادات</h3>
          
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted" />
              <span className="text-sm text-foreground">اللغة</span>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted" />
              <span className="text-sm text-foreground">الإشعارات</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={handleSave} className="w-full py-4">
            حفظ التغييرات
          </Button>
        </motion.div>

        <Separator />

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button variant="outline" className="w-full justify-start text-muted">
            <LogOut className="ml-2 h-4 w-4" />
            تسجيل الخروج
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteAccount}
            className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10"
          >
            <Trash2 className="ml-2 h-4 w-4" />
            حذف الحساب
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
