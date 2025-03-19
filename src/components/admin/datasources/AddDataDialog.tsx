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
import { Plus } from "lucide-react";
import { useState } from "react";

export interface NewDatasource {
  name: string;
  type: string;
  status: string;
}

interface AddDataDialogProps {
  typeOptions: string[];
  statusOptions: string[];
  onAddData?: (data: NewDatasource) => void;
}

export function AddDataDialog({ 
  typeOptions, 
  statusOptions, 
  onAddData 
}: AddDataDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newDatasource, setNewDatasource] = useState<NewDatasource>({
    name: "",
    type: typeOptions[0] || "PDF",
    status: statusOptions[0] || "Uploaded"
  });
  
  const handleAddData = () => {
    if (newDatasource.name.trim() && onAddData) {
      onAddData(newDatasource);
      setNewDatasource({
        name: "",
        type: typeOptions[0] || "PDF",
        status: statusOptions[0] || "Uploaded"
      });
      setIsOpen(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#007AFF] hover:bg-blue-600 cursor-pointer flex justify-center items-center min-w-[120px]"
        >
          <div className="flex items-center">
            <Plus size={16} />
            <span className="ml-1">Add Data</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Datasource</DialogTitle>
          <DialogDescription>
            Enter the details for the new datasource.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newDatasource.name}
              onChange={(e) => setNewDatasource({...newDatasource, name: e.target.value})}
              className="col-span-3"
              placeholder="Enter datasource name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select 
              value={newDatasource.type} 
              onValueChange={(value) => setNewDatasource({...newDatasource, type: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={newDatasource.status} 
              onValueChange={(value) => setNewDatasource({...newDatasource, status: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button 
            onClick={handleAddData} 
            className="bg-[#007AFF] hover:bg-blue-600 cursor-pointer"
            disabled={!newDatasource.name.trim() || !onAddData}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 