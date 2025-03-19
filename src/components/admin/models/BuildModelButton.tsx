"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { BuildModelDialog, NewModel } from "./BuildModelDialog";
import { useState } from "react";

interface BuildModelButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onModelBuilt?: (model: NewModel) => void;
}

export function BuildModelButton({ 
  variant = "default", 
  size = "default", 
  className = "", 
  onModelBuilt 
}: BuildModelButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleBuildModel = (model: NewModel) => {
    if (onModelBuilt) {
      onModelBuilt(model);
    }
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Button 
        variant={variant} 
        size={size} 
        className={`cursor-pointer ${className}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Build a Model
      </Button>
      
      <BuildModelDialog 
        modelTypes={["Fine-tuned", "RAG", "Custom"]}
        baseModels={["GPT-4", "Claude 3", "Llama 3", "Mistral"]}
        onBuildModel={handleBuildModel}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        hideDefaultTrigger={true}
      />
    </>
  );
} 