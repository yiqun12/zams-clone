"use client";

import { useState } from "react";
import { SearchAndFilters } from "@/components/admin/SearchAndFilters";
import { FilterOptions } from "@/types/filters";
import { NewDatasource } from "@/components/admin/datasources/AddDataDialog";
import { DatasourceTable, Datasource } from "@/components/admin/DatasourceTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data
const mockDatasources: Datasource[] = [
  { id: 1, name: 'website - data', type: 'PDF', status: 'Uploaded', createdAt: 'Jan 6 2024', createdBy: 'Olivia Ryhe' },
  { id: 2, name: 'website - data', type: 'PDF', status: 'Uploaded', createdAt: 'Jan 28 2024', createdBy: 'Natalie Craig' },
  { id: 3, name: 'Products', type: 'CSV', status: 'Uploaded', createdAt: 'Feb 4 2024', createdBy: 'Phoenix Baker' },
  { id: 4, name: 'user - data', type: 'CSV', status: 'Connected', createdAt: 'Feb 8 2024', createdBy: 'Natalie Craig' },
  { id: 5, name: 'website - data', type: 'DOCX', status: 'Uploaded', createdAt: 'March 7 2024', createdBy: 'Olivia Ryhe' },
  { id: 6, name: 'website - data', type: 'CSV', status: 'Uploaded', createdAt: 'March 7 2024', createdBy: 'Phoenix Baker' },
  { id: 7, name: 'Server Files', type: 'DOCX', status: 'Uploaded', createdAt: 'March 21 2024', createdBy: 'Natalie Craig' },
  { id: 8, name: 'website - data', type: 'CSV', status: 'Uploaded', createdAt: 'March 28 2024', createdBy: 'Olivia Ryhe' },
  { id: 9, name: 'user - data', type: 'PDF', status: 'Connected', createdAt: 'June 9 2024', createdBy: 'Natalie Craig' },
  { id: 10, name: 'user - data', type: 'DOCX', status: 'Connected', createdAt: 'June 29 2024', createdBy: 'Olivia Ryhe' },
  { id: 11, name: 'user - data', type: 'DOCX', status: 'Connected', createdAt: 'July 2 2024', createdBy: 'Phoenix Baker' },
  { id: 12, name: 'user - data', type: 'DOCX', status: 'Uploaded', createdAt: 'Aug 1 2024', createdBy: 'Natalie Craig' },
  { id: 13, name: 'website - data', type: 'PDF', status: 'Uploaded', createdAt: 'Sept 21 2024', createdBy: 'Olivia Ryhe' },
  { id: 14, name: 'Server Files', type: 'CSV', status: 'Connected', createdAt: 'Sept 21 2024', createdBy: 'Natalie Craig' },
  { id: 15, name: 'website - data', type: 'PDF', status: 'Uploaded', createdAt: 'Sept 21 2024', createdBy: 'Olivia Ryhe' },
  { id: 16, name: 'Server Files', type: 'CSV', status: 'Connected', createdAt: 'Sept 21 2024', createdBy: 'Natalie Craig' },
];

export default function DatasourcesPage() {
  const [datasources, setDatasources] = useState<Datasource[]>(mockDatasources);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({ types: [], statuses: [] });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleDelete = () => {
    setDatasources(datasources.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setDeleteDialogOpen(false);
  };
  
  const handleAddData = (newData: NewDatasource) => {
    // 创建一个新的数据源对象
    const newId = Math.max(...datasources.map(d => d.id), 0) + 1;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newDatasource: Datasource = {
      id: newId,
      name: newData.name,
      type: newData.type,
      status: newData.status,
      createdAt: formattedDate,
      createdBy: 'Current User' // 这里可以替换为实际的用户名
    };
    
    // 将新数据源添加到列表中
    setDatasources([newDatasource, ...datasources]);
  };
  
  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-2">Datasources</h1>
      <p className="text-muted-foreground mb-6">Upload files, connect to databases, or integrate with apps.</p>
      
      <SearchAndFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDeleteSelected={() => setDeleteDialogOpen(true)}
        hasSelectedItems={selectedItems.length > 0}
        onFilterChange={setFilters}
        onAddData={handleAddData}
      />
      
      <DatasourceTable 
        datasources={datasources} 
        onSelectionChange={setSelectedItems}
        searchQuery={searchQuery}
        filters={filters}
        onDelete={(ids) => {
          setDatasources(datasources.filter(item => !ids.includes(item.id)));
          setSelectedItems([]);
        }}
      />
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {selectedItems.length} selected datasource{selectedItems.length > 1 ? 's' : ''}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 