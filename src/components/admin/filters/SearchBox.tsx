"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({ 
  value, 
  onChange, 
  placeholder = "Search", 
  className = "max-w-xs" 
}: SearchBoxProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8 cursor-text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
} 