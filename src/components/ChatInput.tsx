"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ActionButtons } from "./ActionButtons";
import { ChangeEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMobile?: boolean;
  onSend?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function ChatInput({ value, onChange, isMobile = false, onSend, onKeyDown }: ChatInputProps) {
  return (
    <Card className="p-0 shadow-sm border">
      <div className="p-4">
        <Input 
          placeholder="Ask whatever you want..." 
          className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={1000}
        />
      </div>
      
      <div className="flex items-center justify-between p-4 pt-0">
        <ActionButtons isMobile={isMobile} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{value.length}/1000</span>
          <Button 
            size="icon" 
            className="rounded-full h-8 w-8 bg-[#070608] hover:bg-[#070608]/90 cursor-pointer"
            onClick={onSend}
            disabled={!value.trim()}
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 