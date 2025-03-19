import { DatasourceHeader } from "@/components/admin/AdminHeader";
import { Settings } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DatasourceHeader 
        title="Settings"
        icon={Settings}
      />
      {children}
    </>
  );
} 