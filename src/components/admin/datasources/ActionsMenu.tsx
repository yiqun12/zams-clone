"use client";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Filter, MoreVertical, Trash2 } from "lucide-react";

interface ActionsMenuProps {
  hasSelectedItems: boolean;
  onDeleteSelected?: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  onClearFilters?: () => void;
}

export function ActionsMenu({ 
  hasSelectedItems, 
  onDeleteSelected, 
  hasActiveFilters, 
  activeFiltersCount, 
  onClearFilters 
}: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 cursor-pointer">
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={hasSelectedItems ? onDeleteSelected : undefined}
          disabled={!hasSelectedItems}
          className={`
            flex items-center gap-2 cursor-pointer
            ${hasSelectedItems 
              ? "text-red-600 hover:!text-red-600 hover:bg-red-50" 
              : "text-gray-400 cursor-not-allowed opacity-60"}
          `}
        >
          <Trash2 size={16} className={hasSelectedItems ? "text-red-600" : "text-gray-400"} />
          Delete Selected
        </DropdownMenuItem>
        
        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onClearFilters}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Filter size={16} />
              Clear All Filters
              <span className="ml-1 text-xs bg-blue-100 text-blue-600 rounded-full px-1.5">
                {activeFiltersCount}
              </span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 