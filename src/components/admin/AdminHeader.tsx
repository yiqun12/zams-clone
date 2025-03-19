import { LucideIcon } from "lucide-react";

interface DatasourceHeaderProps {
  title: string;
  icon: LucideIcon;
}

export function DatasourceHeader({ title, icon: Icon }: DatasourceHeaderProps) {
  return (
    <div className="p-4">
      <div className="flex items-center">
        <Icon size={18} className="text-muted-foreground" />
        <div className="mx-4 h-4 w-0.5 bg-gray-300"></div>
        <span className="text-muted-foreground">{title}</span>
      </div>
    </div>
  );
} 