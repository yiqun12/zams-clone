"use client";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

interface FilterButtonProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

export function FilterButton({ 
  label, 
  options, 
  selectedOptions, 
  onChange 
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOptionChange = (option: string) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(o => o !== option)
      : [...selectedOptions, option];
    
    onChange(newOptions);
  };
  
  const isActive = selectedOptions.length > 0;
  
  // Base style for filter button
  const filterButtonBaseClass = "cursor-pointer min-w-[104px] flex justify-center items-center";
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`${filterButtonBaseClass} ${isActive ? "border-blue-500 text-blue-500" : ""}`}
        >
          <div className="flex items-center">
            <CirclePlus size={16} />
            <span className="ml-1">{label}</span>
            {isActive && (
              <span className="ml-1 text-xs bg-blue-100 text-blue-600 rounded-full px-1.5">
                {selectedOptions.length}
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by {label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={() => handleOptionChange(option)}
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer"
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => setIsOpen(false)}
          className="justify-center font-medium text-blue-600 cursor-pointer"
        >
          Done
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 