"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Plus } from "lucide-react";

export default function WorkflowsPage() {
  return (
    <div className="p-6 overflow-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Workflows</h1>
          <p className="text-muted-foreground">Automate your AI processes with workflows.</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2 w-full sm:w-auto">
          <Plus size={16} />
          Create Workflow
        </Button>
      </div>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          Workflows feature is currently in development and will be available soon.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="opacity-60 cursor-not-allowed">
          <CardHeader>
            <CardTitle>Data Processing Pipeline</CardTitle>
            <CardDescription>Example workflow (coming soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Automatically process and clean data before feeding it to your models.</p>
          </CardContent>
        </Card>
        
        <Card className="opacity-60 cursor-not-allowed">
          <CardHeader>
            <CardTitle>Model Training Sequence</CardTitle>
            <CardDescription>Example workflow (coming soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Schedule and automate model training with customizable parameters.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 