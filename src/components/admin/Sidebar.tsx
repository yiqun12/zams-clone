"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BuildModelDialog, NewModel } from "./models/BuildModelDialog";

export interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  isActive?: boolean;
  action?: React.ReactNode;
}

export interface UserInfo {
  initials: string;
  name: string;
  email: string;
}

interface SidebarProps {
  appName: string;
  appInitials: string;
  appDescription?: string;
  navItems: NavItem[];
  userInfo: UserInfo;
  defaultCollapsed?: boolean;
}

export function Sidebar({
  appName,
  appInitials,
  appDescription,
  navItems,
  userInfo,
  defaultCollapsed = false
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(defaultCollapsed);
    }
  }, [isMobile, defaultCollapsed]);

  const handleBuildModel = (model: NewModel) => {
    // 处理模型创建逻辑
    console.log("Building model:", model);
    setIsDialogOpen(false);
  };

  return (
    <div className={`border-r bg-card flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-width duration-300 ease-in-out relative`}>
      {/* Collapse toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background z-10 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </Button>

      <div className="p-4 border-b flex items-center">
        <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold">
          {appInitials}
        </div>
        {!collapsed && (
          <div className="ml-2">
            <div className="font-semibold">{appName}</div>
            {appDescription && (
              <div className="text-xs text-muted-foreground">{appDescription}</div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <Button
          variant={collapsed ? "ghost" : "outline"}
          size={collapsed ? "icon" : "default"}
          className={`${collapsed ? 'w-8 p-0 justify-center' : 'w-full justify-center gap-2'} bg-white text-black border shadow-sm hover:bg-gray-50`}
          onClick={() => setIsDialogOpen(true)}
        >
          {collapsed ? (
            <Plus size={16} />
          ) : (
            <>
              <Plus size={16} />
              Build a Model
            </>
          )}
        </Button>

        <BuildModelDialog
          modelTypes={["Fine-tuned", "RAG", "Custom"]}
          baseModels={["GPT-4", "Claude 3", "Llama 3", "Mistral"]}
          onBuildModel={handleBuildModel}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          hideDefaultTrigger={true}
        />
      </div>

      {!collapsed && (
        <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
          Pages
        </div>
      )}

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          if (item.badge) {
            return (
              <Link href={item.href} key={index} className="block">
                <Button
                  variant={item.isActive ? "secondary" : "ghost"}
                  className={`${collapsed ? 'w-8 p-0 mx-auto justify-center' : 'w-full justify-between'} font-normal text-sm cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    {!collapsed && item.name}
                  </div>
                  {!collapsed && item.badge && (
                    <Badge variant="outline" className="ml-auto text-xs bg-gray-100">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          }

          if (item.action) {
            return (
              <Link href={item.href} key={index} className="block">
                <Button
                  variant={item.isActive ? "secondary" : "ghost"}
                  className={`${collapsed ? 'w-8 p-0 mx-auto justify-center' : 'w-full justify-between'} font-normal text-sm cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    {!collapsed && item.name}
                  </div>
                  {!collapsed && item.action}
                </Button>
              </Link>
            );
          }

          return (
            <Link href={item.href} key={index} className="block">
              <Button
                variant={item.isActive ? "secondary" : "ghost"}
                className={`${collapsed ? 'w-8 p-0 mx-auto justify-center' : 'w-full justify-start gap-2'} font-normal text-sm cursor-pointer`}
              >
                <Icon size={16} />
                {!collapsed && item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
          {userInfo.initials}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{userInfo.name}</div>
            <div className="text-xs text-muted-foreground truncate">{userInfo.email}</div>
          </div>
        )}
      </div>
    </div>
  );
}
