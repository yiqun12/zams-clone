import { DatasourceHeader } from "@/components/admin/AdminHeader";
import { FileText } from "lucide-react";

export default function DatasourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DatasourceHeader 
        title="Datasources"
        icon={FileText}
      />
      {children}
    </>
  );
} 