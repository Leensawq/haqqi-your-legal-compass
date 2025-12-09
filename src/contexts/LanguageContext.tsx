import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // App name
    "app.name": "حقي",
    "app.tagline": "اعرف حقوقك القانونية بكل سهولة",
    
    // Navigation
    "nav.home": "الرئيسية",
    "nav.newCase": "قضية جديدة",
    "nav.myCases": "قضاياي",
    "nav.academy": "الأكاديمية",
    "nav.profile": "حسابي",
    
    // Home
    "home.enterSituation": "أدخل موقفي",
    "home.legalCategories": "التصنيفات القانونية",
    "home.searchPlaceholder": "ابحث عن قانون أو موضوع...",
    
    // Categories
    "category.work": "العمل",
    "category.work.desc": "حقوق العمال وقانون العمل",
    "category.health": "الصحة",
    "category.health.desc": "حقوق المرضى والتأمين",
    "category.family": "الأسرة",
    "category.family.desc": "قانون الأحوال الشخصية",
    "category.education": "التعليم",
    "category.education.desc": "حقوق الطلاب",
    "category.ecommerce": "التجارة الإلكترونية",
    "category.ecommerce.desc": "حماية المستهلك",
    "category.realestate": "العقارات",
    "category.realestate.desc": "قوانين الإيجار والملكية",
    "category.other": "أخرى",
    
    // Create Case
    "createCase.title": "إنشاء قضية جديدة",
    "createCase.describeSituation": "صف موقفك",
    "createCase.placeholder": "اكتب هنا تفاصيل موقفك أو مشكلتك القانونية...",
    "createCase.category": "التصنيف",
    "createCase.selectCategory": "اختر التصنيف",
    "createCase.attachFiles": "إرفاق ملفات (اختياري)",
    "createCase.uploadFile": "رفع ملف",
    "createCase.photo": "صورة",
    "createCase.pdfDocument": "مستند PDF",
    "createCase.analyze": "تحليل الموقف",
    "createCase.analyzing": "جاري التحليل...",
    "createCase.error": "خطأ",
    "createCase.describFirst": "الرجاء وصف موقفك أولاً",
    
    // Analysis
    "analysis.title": "نتائج التحليل",
    "analysis.summary": "ملخص الموقف",
    "analysis.summaryText": "بناءً على تحليل موقفك، يتضح أن لديك عدة حقوق قانونية يمكنك المطالبة بها. الوضع يشير إلى انتهاك محتمل لنظام العمل.",
    "analysis.successRate": "احتمالية النجاح",
    "analysis.yourRights": "حقوقك القانونية",
    "analysis.recommendedSteps": "الخطوات الموصى بها",
    "analysis.generateLetter": "إنشاء خطاب رسمي",
    "analysis.saveCase": "حفظ القضية",
    "analysis.sendToAuthority": "إرسال للجهة",
    "analysis.saved": "تم الحفظ",
    "analysis.caseSaved": "تم حفظ القضية بنجاح",
    
    // Mock rights
    "right.compensation.title": "الحق في التعويض",
    "right.compensation.desc": "يحق لك المطالبة بتعويض عن الأضرار المادية والمعنوية",
    "right.compensation.ref": "نظام العمل - المادة 77",
    "right.endOfService.title": "الحق في إنهاء الخدمة",
    "right.endOfService.desc": "يحق لك الحصول على مكافأة نهاية الخدمة كاملة",
    "right.endOfService.ref": "نظام العمل - المادة 84",
    "right.certificate.title": "الحق في شهادة الخبرة",
    "right.certificate.desc": "يلتزم صاحب العمل بتزويدك بشهادة خبرة",
    "right.certificate.ref": "نظام العمل - المادة 64",
    
    // Mock actions
    "action.document.title": "توثيق الأدلة",
    "action.document.desc": "احتفظ بنسخ من جميع المراسلات والعقود",
    "action.complaint.title": "تقديم شكوى",
    "action.complaint.desc": "قدم شكوى رسمية لوزارة الموارد البشرية",
    "action.followup.title": "المتابعة",
    "action.followup.desc": "تابع حالة شكواك خلال 15 يوم عمل",
    
    // Letter Generation
    "letter.title": "إنشاء خطاب رسمي",
    "letter.recipient": "الجهة المستلمة",
    "letter.content": "محتوى الخطاب",
    "letter.edit": "تعديل",
    "letter.preview": "معاينة",
    "letter.personalInfo": "بياناتك الشخصية",
    "letter.fullName": "الاسم الكامل",
    "letter.idNumber": "رقم الهوية",
    "letter.phone": "رقم الجوال",
    "letter.downloadPdf": "تحميل PDF",
    "letter.send": "إرسال الخطاب",
    "letter.downloading": "جاري التحميل",
    "letter.downloadDesc": "سيتم تحميل الخطاب بصيغة PDF",
    "letter.sent": "تم الإرسال",
    "letter.sentDesc": "تم إرسال الخطاب بنجاح",
    "letter.defaultRecipient": "وزارة الموارد البشرية",
    
    // My Cases
    "myCases.title": "قضاياي",
    "myCases.notifications": "الإشعارات",
    "myCases.allCases": "جميع القضايا",
    "myCases.noCases": "لا توجد قضايا حتى الآن",
    "myCases.status.sent": "مرسلة",
    "myCases.status.reviewing": "قيد المراجعة",
    "myCases.status.closed": "مغلقة",
    
    // Mock cases
    "case.unfairDismissal": "شكوى فصل تعسفي",
    "case.refund": "استرداد مبلغ مشتريات",
    "case.rentalDispute": "نزاع عقد إيجار",
    
    // Mock notifications
    "notification.updated": "تم تحديث حالة قضيتك رقم #1234",
    "notification.received": "تم استلام ردك على الشكوى",
    "notification.hourAgo": "منذ ساعة",
    "notification.daysAgo": "منذ يومين",
    
    // Academy
    "academy.title": "الأكاديمية",
    "academy.header": "تعلم حقوقك",
    "academy.subheader": "دورات ومقالات تعليمية لفهم حقوقك القانونية",
    "academy.availableCourses": "الدورات المتاحة",
    "academy.lessons": "دروس",
    "academy.video": "فيديو",
    "academy.article": "مقال",
    "academy.course1.title": "مقدمة في نظام العمل السعودي",
    "academy.course1.duration": "45 دقيقة",
    "academy.course2.title": "حقوق المستهلك في التجارة الإلكترونية",
    "academy.course2.duration": "30 دقيقة",
    "academy.course3.title": "كيف تكتب شكوى رسمية فعالة",
    "academy.course3.duration": "20 دقيقة",
    
    // Profile
    "profile.title": "حسابي",
    "profile.user": "مستخدم حقي",
    "profile.loginSignup": "تسجيل الدخول / إنشاء حساب",
    "profile.personalInfo": "المعلومات الشخصية",
    "profile.fullName": "الاسم الكامل",
    "profile.phone": "رقم الجوال",
    "profile.email": "البريد الإلكتروني",
    "profile.settings": "الإعدادات",
    "profile.language": "اللغة",
    "profile.notifications": "الإشعارات",
    "profile.saveChanges": "حفظ التغييرات",
    "profile.logout": "تسجيل الخروج",
    "profile.deleteAccount": "حذف الحساب",
    "profile.saved": "تم الحفظ",
    "profile.savedDesc": "تم حفظ التغييرات بنجاح",
    "profile.alert": "تنبيه",
    "profile.deleteConfirm": "هل أنت متأكد من حذف حسابك؟",
  },
  en: {
    // App name
    "app.name": "Haqqi",
    "app.tagline": "Know your legal rights easily",
    
    // Navigation
    "nav.home": "Home",
    "nav.newCase": "New Case",
    "nav.myCases": "My Cases",
    "nav.academy": "Academy",
    "nav.profile": "Profile",
    
    // Home
    "home.enterSituation": "Enter My Situation",
    "home.legalCategories": "Legal Categories",
    "home.searchPlaceholder": "Search for a law or topic...",
    
    // Categories
    "category.work": "Work",
    "category.work.desc": "Labor rights and employment law",
    "category.health": "Health",
    "category.health.desc": "Patient rights and insurance",
    "category.family": "Family",
    "category.family.desc": "Personal status law",
    "category.education": "Education",
    "category.education.desc": "Student rights",
    "category.ecommerce": "E-Commerce",
    "category.ecommerce.desc": "Consumer protection",
    "category.realestate": "Real Estate",
    "category.realestate.desc": "Rental and ownership laws",
    "category.other": "Other",
    
    // Create Case
    "createCase.title": "Create New Case",
    "createCase.describeSituation": "Describe your situation",
    "createCase.placeholder": "Write details about your situation or legal issue here...",
    "createCase.category": "Category",
    "createCase.selectCategory": "Select category",
    "createCase.attachFiles": "Attach files (optional)",
    "createCase.uploadFile": "Upload file",
    "createCase.photo": "Photo",
    "createCase.pdfDocument": "PDF Document",
    "createCase.analyze": "Analyze Situation",
    "createCase.analyzing": "Analyzing...",
    "createCase.error": "Error",
    "createCase.describFirst": "Please describe your situation first",
    
    // Analysis
    "analysis.title": "Analysis Results",
    "analysis.summary": "Situation Summary",
    "analysis.summaryText": "Based on our analysis, you have several legal rights you can claim. The situation indicates a potential violation of labor law.",
    "analysis.successRate": "Success Rate",
    "analysis.yourRights": "Your Legal Rights",
    "analysis.recommendedSteps": "Recommended Steps",
    "analysis.generateLetter": "Generate Official Letter",
    "analysis.saveCase": "Save Case",
    "analysis.sendToAuthority": "Send to Authority",
    "analysis.saved": "Saved",
    "analysis.caseSaved": "Case saved successfully",
    
    // Mock rights
    "right.compensation.title": "Right to Compensation",
    "right.compensation.desc": "You have the right to claim compensation for material and moral damages",
    "right.compensation.ref": "Labor Law - Article 77",
    "right.endOfService.title": "End of Service Benefits",
    "right.endOfService.desc": "You are entitled to receive full end-of-service benefits",
    "right.endOfService.ref": "Labor Law - Article 84",
    "right.certificate.title": "Experience Certificate",
    "right.certificate.desc": "The employer must provide you with an experience certificate",
    "right.certificate.ref": "Labor Law - Article 64",
    
    // Mock actions
    "action.document.title": "Document Evidence",
    "action.document.desc": "Keep copies of all correspondence and contracts",
    "action.complaint.title": "File a Complaint",
    "action.complaint.desc": "Submit an official complaint to the Ministry of Human Resources",
    "action.followup.title": "Follow Up",
    "action.followup.desc": "Follow up on your complaint status within 15 business days",
    
    // Letter Generation
    "letter.title": "Generate Official Letter",
    "letter.recipient": "Recipient",
    "letter.content": "Letter Content",
    "letter.edit": "Edit",
    "letter.preview": "Preview",
    "letter.personalInfo": "Your Personal Information",
    "letter.fullName": "Full Name",
    "letter.idNumber": "ID Number",
    "letter.phone": "Phone Number",
    "letter.downloadPdf": "Download PDF",
    "letter.send": "Send Letter",
    "letter.downloading": "Downloading",
    "letter.downloadDesc": "The letter will be downloaded as PDF",
    "letter.sent": "Sent",
    "letter.sentDesc": "Letter sent successfully",
    "letter.defaultRecipient": "Ministry of Human Resources",
    
    // My Cases
    "myCases.title": "My Cases",
    "myCases.notifications": "Notifications",
    "myCases.allCases": "All Cases",
    "myCases.noCases": "No cases yet",
    "myCases.status.sent": "Sent",
    "myCases.status.reviewing": "Under Review",
    "myCases.status.closed": "Closed",
    
    // Mock cases
    "case.unfairDismissal": "Unfair Dismissal Complaint",
    "case.refund": "Purchase Refund Request",
    "case.rentalDispute": "Rental Contract Dispute",
    
    // Mock notifications
    "notification.updated": "Your case #1234 status has been updated",
    "notification.received": "Your response to the complaint was received",
    "notification.hourAgo": "1 hour ago",
    "notification.daysAgo": "2 days ago",
    
    // Academy
    "academy.title": "Academy",
    "academy.header": "Learn Your Rights",
    "academy.subheader": "Educational courses and articles to understand your legal rights",
    "academy.availableCourses": "Available Courses",
    "academy.lessons": "lessons",
    "academy.video": "Video",
    "academy.article": "Article",
    "academy.course1.title": "Introduction to Saudi Labor Law",
    "academy.course1.duration": "45 minutes",
    "academy.course2.title": "Consumer Rights in E-Commerce",
    "academy.course2.duration": "30 minutes",
    "academy.course3.title": "How to Write an Effective Official Complaint",
    "academy.course3.duration": "20 minutes",
    
    // Profile
    "profile.title": "My Account",
    "profile.user": "Haqqi User",
    "profile.loginSignup": "Login / Sign Up",
    "profile.personalInfo": "Personal Information",
    "profile.fullName": "Full Name",
    "profile.phone": "Phone Number",
    "profile.email": "Email",
    "profile.settings": "Settings",
    "profile.language": "Language",
    "profile.notifications": "Notifications",
    "profile.saveChanges": "Save Changes",
    "profile.logout": "Log Out",
    "profile.deleteAccount": "Delete Account",
    "profile.saved": "Saved",
    "profile.savedDesc": "Changes saved successfully",
    "profile.alert": "Alert",
    "profile.deleteConfirm": "Are you sure you want to delete your account?",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("haqqi-language");
    return (saved as Language) || "ar";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("haqqi-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
