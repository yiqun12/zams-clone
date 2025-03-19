"use client";

import { useState } from "react";
import { BuildModelButton } from "@/components/admin/models/BuildModelButton";
import { NewModel } from "@/components/admin/models/BuildModelDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MoreVertical, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// 模拟数据
const mockModels = [
  { id: 1, name: "Customer Support Bot", type: "Fine-tuned", baseModel: "GPT-4", status: "Active", createdAt: "Apr 12, 2024" },
  { id: 2, name: "Product Recommendation", type: "RAG", baseModel: "Claude 3", status: "Training", createdAt: "Apr 10, 2024" },
  { id: 3, name: "Content Generator", type: "Custom", baseModel: "Llama 3", status: "Active", createdAt: "Apr 5, 2024" },
];

export default function ModelsPage() {
  const [models, setModels] = useState(mockModels);
  
  const handleBuildModel = (newModel: NewModel) => {
    const model = {
      id: Math.max(...models.map(m => m.id), 0) + 1,
      name: newModel.name,
      type: newModel.type,
      baseModel: newModel.baseModel,
      status: "Training",
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    setModels([model, ...models]);
  };
  
  const handleDeleteModel = (id: number) => {
    setModels(models.filter(model => model.id !== id));
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">AI Models</h1>
          <p className="text-muted-foreground">Build and manage your custom AI models</p>
        </div>
        <BuildModelButton 
          className="w-full sm:w-auto bg-[#007AFF] hover:bg-blue-600 text-white"
          onModelBuilt={handleBuildModel}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map(model => (
          <Card key={model.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription>{model.baseModel}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => handleDeleteModel(model.id)}
                      className="text-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Model
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {model.type}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    model.status === "Active" 
                      ? "bg-green-50 text-green-700 hover:bg-green-100" 
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                  }
                >
                  {model.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Created on {model.createdAt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Sparkles size={16} className="mr-2" />
                Use Model
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 