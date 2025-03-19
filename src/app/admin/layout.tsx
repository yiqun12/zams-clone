"use client";

import { usePathname } from "next/navigation";
import { Sidebar, NavItem, UserInfo } from "@/components/admin/Sidebar";
import { LoadingBar } from "@/components/admin/LoadingBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  FileText,
  LayoutGrid,
  GitBranch,
  Settings
} from "lucide-react";
import {Suspense} from "react";

function LoadingBarWrapper() {
  return <LoadingBar />;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Models', icon: LayoutGrid, href: '/admin/models', isActive: pathname === '/admin/models' },
    { name: 'Datasources', icon: FileText, href: '/admin/datasources', isActive: pathname === '/admin/datasources' },
    { name: 'Workflows', icon: GitBranch, href: '/admin/workflows', badge: 'Coming soon', isActive: pathname === '/admin/workflows' },
    { name: 'Settings', icon: Settings, href: '/admin/settings', isActive: pathname === '/admin/settings' },
  ];

  // User info
  const userInfo: UserInfo = {
    initials: 'JD',
    name: 'John Doe',
    email: 'john.doe@zams.com'
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Loading bar wrapped in Suspense */}
      <Suspense>
        <LoadingBarWrapper />
      </Suspense>

      {/* Sidebar */}
      <Sidebar
        appName="Zams"
        appInitials="Za"
        appDescription="Platform UI"
        navItems={navItems}
        userInfo={userInfo}
        defaultCollapsed={isMobile}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
