"use client";

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export interface NewModel {
  name: string;
  type: string;
  baseModel: string;
  temperature: number;
  maxTokens: number;
}

interface BuildModelDialogProps {
  modelTypes: string[];
  baseModels: string[];
  onBuildModel?: (model: NewModel) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideDefaultTrigger?: boolean;
}

export function BuildModelDialog({ 
  modelTypes = ["Fine-tuned", "RAG", "Custom"], 
  baseModels = ["GPT-4", "Claude 3", "Llama 3", "Mistral"], 
  onBuildModel,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  hideDefaultTrigger = false
}: BuildModelDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external state or internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const onOpenChange = externalOnOpenChange || setInternalIsOpen;
  
  const [newModel, setNewModel] = useState<NewModel>({
    name: "",
    type: modelTypes[0] || "Fine-tuned",
    baseModel: baseModels[0] || "GPT-4",
    temperature: 0.7,
    maxTokens: 2048
  });
  
  const handleBuildModel = () => {
    if (newModel.name.trim() && onBuildModel) {
      onBuildModel(newModel);
      setNewModel({
        name: "",
        type: modelTypes[0] || "Fine-tuned",
        baseModel: baseModels[0] || "GPT-4",
        temperature: 0.7,
        maxTokens: 2048
      });
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {!hideDefaultTrigger && (
        <DialogTrigger asChild>
          <Button 
            className="bg-[#007AFF] hover:bg-blue-600 cursor-pointer flex justify-center items-center min-w-[140px]"
          >
            <div className="flex items-center">
              <Sparkles size={16} />
              <span className="ml-1">Build a Model</span>
            </div>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Build a New Model</DialogTitle>
          <DialogDescription>
            Configure your custom AI model with the settings below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right text-muted-foreground text-sm">
              Model Name
            </Label>
            <Input
              id="name"
              value={newModel.name}
              onChange={(e) => setNewModel({...newModel, name: e.target.value})}
              className="sm:col-span-3"
              placeholder="Enter model name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="type" className="sm:text-right text-muted-foreground text-sm">
              Model Type
            </Label>
            <Select 
              value={newModel.type} 
              onValueChange={(value) => setNewModel({...newModel, type: value})}
            >
              <SelectTrigger className="sm:col-span-3">
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent>
                {modelTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="baseModel" className="sm:text-right text-muted-foreground text-sm">
              Base Model
            </Label>
            <Select 
              value={newModel.baseModel} 
              onValueChange={(value) => setNewModel({...newModel, baseModel: value})}
            >
              <SelectTrigger className="sm:col-span-3">
                <SelectValue placeholder="Select base model" />
              </SelectTrigger>
              <SelectContent>
                {baseModels.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="temperature" className="sm:text-right text-muted-foreground text-sm">
              Temperature
            </Label>
            <div className="sm:col-span-3 space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Precise</span>
                <span className="text-xs text-muted-foreground">Creative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{newModel.temperature.toFixed(1)}</span>
                <Slider
                  value={[newModel.temperature]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setNewModel({...newModel, temperature: value[0]})}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="maxTokens" className="sm:text-right text-muted-foreground text-sm">
              Max Tokens
            </Label>
            <div className="sm:col-span-3">
              <Input
                id="maxTokens"
                type="number"
                value={newModel.maxTokens}
                onChange={(e) => setNewModel({...newModel, maxTokens: parseInt(e.target.value) || 0})}
                min={1}
                max={8192}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum number of tokens the model can generate in a response.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button 
            onClick={handleBuildModel} 
            className="bg-[#007AFF] hover:bg-blue-600 cursor-pointer"
            disabled={!newModel.name.trim() || !onBuildModel}
          >
            Build Model
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 