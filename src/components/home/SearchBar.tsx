import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ placeholder = "ابحث عن قانون أو موضوع...", value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pr-10 bg-card border-border placeholder:text-muted"
      />
    </div>
  );
}
