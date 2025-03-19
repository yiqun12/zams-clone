"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, PenLine, CirclePlus } from "lucide-react";

interface ActionButtonsProps {
  isMobile?: boolean;
}

export function ActionButtons({ isMobile = false }: ActionButtonsProps) {
  return (
    <div className={`flex items-center ${isMobile ? 'gap-4' : 'gap-6'}`}>
      <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground p-0 hover:bg-transparent hover:text-foreground cursor-pointer">
        <span className="flex items-center gap-2">
          <PenLine className="h-5 w-5" />
          Response Type
          <ChevronDown className="h-4 w-4" />
        </span>
      </Button>
      <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground p-0 hover:bg-transparent hover:text-foreground cursor-pointer">
        <span className="flex items-center gap-2">
          <CirclePlus className="h-5 w-5 rounded-full" />
          {isMobile ? (
            <span className="hidden sm:inline">Add Attachment</span>
          ) : (
            "Add Attachment"
          )}
        </span>
      </Button>
    </div>
  );
}
