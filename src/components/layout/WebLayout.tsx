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
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3">
              <img src={haqqiLogo} alt="حَقّي" className="h-10 w-auto" />
              <span className="text-xl font-bold text-card-foreground hidden sm:block">حَقّي</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            جميع الحقوق محفوظة لمنصة حَقّي © 2024
          </div>
        </div>
      </footer>
    </div>
  );
}
