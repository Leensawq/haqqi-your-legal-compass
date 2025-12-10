import { Home, Plus, FolderOpen, GraduationCap, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", icon: Home, label: "الرئيسية" },
  { to: "/create-case", icon: Plus, label: "قضية جديدة" },
  { to: "/my-cases", icon: FolderOpen, label: "قضاياي" },
  { to: "/academy", icon: GraduationCap, label: "الأكاديمية" },
  { to: "/profile", icon: User, label: "حسابي" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground transition-colors hover:text-primary"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
