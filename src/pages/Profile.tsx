import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Globe, Bell, LogOut, Trash2 } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("محمد أحمد");
  const [phone, setPhone] = useState("0501234567");
  const [email, setEmail] = useState("mohammed@example.com");
  const [language, setLanguage] = useState("ar");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => { toast({ title: "تم الحفظ", description: "تم حفظ التغييرات بنجاح" }); };

  return (
    <WebLayout>
      <div className="max-w-2xl mx-auto space-y-8" dir="rtl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">حسابي</h1>
          <p className="text-muted-foreground mt-2">إدارة معلومات حسابك</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 border border-border">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-10 h-10 text-primary" /></div>
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">{fullName}</h2>
              <p className="text-muted-foreground">رقم الهوية: {user?.nationalId || "1122334455"}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-8 border border-border space-y-6">
          <h3 className="text-xl font-bold text-card-foreground">المعلومات الشخصية</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">الاسم الكامل</label>
              <div className="relative"><User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="pr-10 bg-background border-border text-card-foreground" dir="rtl" /></div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">رقم الجوال</label>
              <div className="relative"><Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pr-10 bg-background border-border text-card-foreground" dir="ltr" /></div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">البريد الإلكتروني</label>
              <div className="relative"><Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input value={email} onChange={(e) => setEmail(e.target.value)} className="pr-10 bg-background border-border text-card-foreground" dir="ltr" /></div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-8 border border-border space-y-6">
          <h3 className="text-xl font-bold text-card-foreground">الإعدادات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-muted-foreground" /><span className="text-card-foreground">اللغة</span></div>
              <Select value={language} onValueChange={setLanguage}><SelectTrigger className="w-32 bg-card border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ar">العربية</SelectItem><SelectItem value="en">English</SelectItem></SelectContent></Select>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3"><Bell className="w-5 h-5 text-muted-foreground" /><span className="text-card-foreground">الإشعارات</span></div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
          <Button onClick={handleSave} className="w-full py-6 text-lg">حفظ التغييرات</Button>
          <Button variant="outline" onClick={logout} className="w-full py-6 text-lg"><LogOut className="w-5 h-5 ml-2" />تسجيل الخروج</Button>
          <Button variant="ghost" className="w-full py-4 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4 ml-2" />حذف الحساب</Button>
        </motion.div>
      </div>
    </WebLayout>
  );
}
