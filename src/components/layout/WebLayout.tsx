import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquarePlus, ClipboardList, UserCircle } from "lucide-react";
import haqqiLogo from "@/assets/haqqi-logo-new.png";

interface WebLayoutProps {
  children: ReactNode;
}

const navItems = [{
  path: "/home",
  label: "الرئيسية",
  icon: LayoutDashboard
}, {
  path: "/new-case",
  label: "إضافة موقف",
  icon: MessageSquarePlus
}, {
  path: "/my-cases",
  label: "سجل المواقف",
  icon: ClipboardList
}, {
  path: "/profile",
  label: "حسابي",
  icon: UserCircle
}];
export function WebLayout({
  children
}: WebLayoutProps) {
  const location = useLocation();
  return <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Top Navigation - Reduced height */}
      <header className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-border/50 shadow-md">
        <div className="max-w-[1250px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo - Always navigates to /home */}
            <Link to="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img alt="حَقّي" src="/lovable-uploads/8465b8e3-90fd-433b-be05-50a96e5678ae.png" className="h-12 lg:h-10 w-auto" />
              <span className="text-base lg:text-lg font-bold text-foreground">حَقّي</span>
            </Link>

            {/* Navigation Links - Reduced sizes */}
            <nav className="flex items-center gap-1.5 lg:gap-2">
              {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/80 hover:bg-primary/20 hover:text-primary"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? "bg-primary-foreground/10" : "bg-white/5"}`}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>;
            })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Max width container */}
      <main className="flex-1 w-full px-4 lg:px-8 py-5 lg:py-8">
        <div className="w-full max-w-[1250px] mx-auto">
          {children}
        </div>
      </main>

      {/* Footer - Reduced padding */}
      <footer className="bg-secondary/50 border-t border-border/50">
        <div className="max-w-[1250px] mx-auto px-4 lg:px-8 py-4">
          <div className="text-center text-xs text-foreground/60">
            جميع الحقوق محفوظة لمنصة حَقّي © 2024
          </div>
        </div>
      </footer>
    </div>;
}