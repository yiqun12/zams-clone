import { redirect } from "next/navigation";

export default function AdminPage() {
  // 重定向到数据源页面或其他默认页面
  redirect("/admin/datasources");
} 