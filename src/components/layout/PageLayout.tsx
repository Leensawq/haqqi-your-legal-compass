import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {title && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="mx-auto flex max-w-lg items-center justify-center px-4 py-4">
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
