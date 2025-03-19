import { DatasourceHeader } from "@/components/admin/AdminHeader";
import { LayoutGrid } from "lucide-react";

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DatasourceHeader 
        title="Models"
        icon={LayoutGrid}
      />
      {children}
    </>
  );
} 