import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FilePlus, FolderOpen, User } from "lucide-react";
import haqqiLogo from "@/assets/haqqi-logo.png";

interface WebLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/home", label: "الرئيسية", icon: Home },
  { path: "/new-case", label: "قضية جديدة", icon: FilePlus },
  { path: "/my-cases", label: "قضاياتي", icon: FolderOpen },
  { path: "/profile", label: "حسابي", icon: User },
];

export function WebLayout({ children }: WebLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Top Navigation - Full Width */}
      <header className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-border/50 shadow-lg">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Always navigates to /home */}
            <Link 
              to="/home" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={haqqiLogo} alt="حَقّي" className="h-10 lg:h-12 w-auto" />
              <span className="text-xl lg:text-2xl font-bold text-foreground">حَقّي</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2 lg:gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl text-sm lg:text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground/80 hover:bg-primary/20 hover:text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width with proper padding */}
      <main className="flex-1 w-full px-6 lg:px-12 xl:px-16 py-8 lg:py-12">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border/50">
        <div className="w-full px-6 lg:px-12 xl:px-16 py-6">
          <div className="text-center text-sm text-foreground/60">
            جميع الحقوق محفوظة لمنصة حَقّي © 2024
          </div>
        </div>
      </footer>
    </div>
  );
}
