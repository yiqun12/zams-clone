"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
import {FilterOptions} from "@/types/filters";

export interface Datasource {
  id: number;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  createdBy: string;
}

interface DatasourceTableProps {
  datasources: Datasource[];
  onDelete?: (ids: number[]) => void;
  onSelectionChange?: (ids: number[]) => void;
  searchQuery?: string;
  filters?: FilterOptions;
}

type SortField = "createdAt" | "createdBy" | null;
type SortDirection = "asc" | "desc" | null;

export function DatasourceTable({
  datasources,
  onDelete,
  onSelectionChange,
  searchQuery = "",
  filters
}: DatasourceTableProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const itemsPerPage = 10;
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  const effectiveSearchQuery = searchQuery || internalSearchQuery;

  const toggleSelectAll = () => {
    const newSelectedItems = selectedItems.length === datasources.length
      ? []
      : datasources.map(item => item.id);

    setSelectedItems(newSelectedItems);
    if (onSelectionChange) {
      onSelectionChange(newSelectedItems);
    }
  };

  const toggleSelectItem = (id: number) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter(itemId => itemId !== id)
      : [...selectedItems, id];

    setSelectedItems(newSelectedItems);
    if (onSelectionChange) {
      onSelectionChange(newSelectedItems);
    }
  };

  const confirmDelete = () => {
    if (selectedItems.length > 0) {
      if (onDelete) {
        onDelete(selectedItems);
      }

      setSelectedItems([]);
    }
    setDeleteDialogOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'text-red-600 bg-red-50';
      case 'CSV':
        return 'text-green-600 bg-green-50';
      case 'DOCX':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Uploaded':
        return 'text-green-600 border-green-200';
      case 'Connected':
        return 'text-blue-600 border-blue-200';
      default:
        return 'text-gray-600 border-gray-200';
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown size={16} className="ml-1 opacity-50" />;
    }
    if (sortDirection === "asc") {
      return <ChevronUp size={16} className="ml-1" />;
    }
    if (sortDirection === "desc") {
      return <ChevronDown size={16} className="ml-1" />;
    }
    return <ChevronsUpDown size={16} className="ml-1" />;
  };

  const filteredAndSortedData = useMemo(() => {
    let result = datasources;

    if (effectiveSearchQuery) {
      const query = effectiveSearchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.createdBy.toLowerCase().includes(query)
      );
    }

    if (filters && filters?.types.length > 0) {
      result = result.filter(item => filters.types.includes(item.type));
    }

    if (filters && filters?.statuses.length > 0) {
      result = result.filter(item => filters.statuses.includes(item.status));
    }

    if (sortField && sortDirection) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [datasources, sortField, sortDirection, effectiveSearchQuery, filters]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className={`${isMobile ? '' : 'border rounded-lg overflow-hidden'}`}>
      {isMobile ? (
        <div className="space-y-4">
          {paginatedData.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <Checkbox
                  className="cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleSelectItem(item.id)}
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={`ml-2 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2">{item.createdAt}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">By:</span>
                  <span className="ml-2">{item.createdBy}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {paginatedData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No datasources found</p>
              {effectiveSearchQuery && (
                <Button
                  variant="link"
                  onClick={() => setInternalSearchQuery('')}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-280px)] overflow-auto">
                <Table>
                  <TableHeader className="text-gray-50">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          className="cursor-pointer"
                          checked={selectedItems.length === datasources.length && datasources.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="font-medium text-gray-500">Datasource</TableHead>
                      <TableHead className="font-medium text-gray-500">Type</TableHead>
                      <TableHead className="font-medium text-gray-500">Status</TableHead>
                      <TableHead>
                        <div
                          className="flex items-center cursor-pointer font-medium text-gray-500"
                          onClick={() => handleSort("createdAt")}
                        >
                          Created at
                          {getSortIcon("createdAt")}
                        </div>
                      </TableHead>
                      <TableHead>
                        <div
                          className="flex items-center cursor-pointer font-medium text-gray-500"
                          onClick={() => handleSort("createdBy")}
                        >
                          Created by
                          {getSortIcon("createdBy")}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            className="cursor-pointer"
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.createdBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="cursor-pointer"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="cursor-pointer"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

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
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
