import { DatasourceHeader } from "@/components/admin/AdminHeader";
import { GitBranch } from "lucide-react";

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DatasourceHeader 
        title="Workflows"
        icon={GitBranch}
      />
      {children}
    </>
  );
} 