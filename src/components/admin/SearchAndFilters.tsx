"use client";

import { FilterOptions } from "@/types/filters";
import { SearchBox } from "./filters/SearchBox";
import { FilterButton } from "./filters/FilterButton";
import { AddDataDialog, NewDatasource } from "./datasources/AddDataDialog";
import { ActionsMenu } from "./datasources/ActionsMenu";
import { useState } from "react";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDeleteSelected?: () => void;
  hasSelectedItems?: boolean;
  onFilterChange?: (filters: FilterOptions) => void;
  onAddData?: (data: NewDatasource) => void;
}

export function SearchAndFilters({ 
  searchQuery, 
  onSearchChange, 
  onDeleteSelected,
  hasSelectedItems = false,
  onFilterChange,
  onAddData
}: SearchAndFiltersProps) {
  const typeOptions = ["PDF", "CSV", "DOCX"];
  const statusOptions = ["Uploaded", "Connected"];
  
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    types: [],
    statuses: []
  });
  
  const handleTypeFilterChange = (types: string[]) => {
    const newFilters = { ...activeFilters, types };
    setActiveFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  const handleStatusFilterChange = (statuses: string[]) => {
    const newFilters = { ...activeFilters, statuses };
    setActiveFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  const handleClearFilters = () => {
    const newFilters = { types: [], statuses: [] };
    setActiveFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  const hasActiveFilters = activeFilters.types.length > 0 || activeFilters.statuses.length > 0;
  const activeFiltersCount = activeFilters.types.length + activeFilters.statuses.length;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
      {/* Search and filters - flex column on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        {/* Search box - full width on mobile, flex-1 on desktop */}
        <div className="w-full sm:w-auto sm:flex-1">
          <SearchBox 
            value={searchQuery} 
            onChange={onSearchChange} 
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            label="Type" 
            options={typeOptions} 
            selectedOptions={activeFilters.types} 
            onChange={handleTypeFilterChange} 
          />
          
          <FilterButton 
            label="Status" 
            options={statusOptions} 
            selectedOptions={activeFilters.statuses} 
            onChange={handleStatusFilterChange} 
          />
        </div>
      </div>
      
      {/* Actions - right side */}
      <div className="flex items-center gap-2">
        <AddDataDialog 
          typeOptions={typeOptions} 
          statusOptions={statusOptions} 
          onAddData={onAddData} 
        />
        
        <ActionsMenu 
          hasSelectedItems={hasSelectedItems} 
          onDeleteSelected={onDeleteSelected} 
          hasActiveFilters={hasActiveFilters} 
          activeFiltersCount={activeFiltersCount} 
          onClearFilters={handleClearFilters} 
        />
      </div>
    </div>
  );
} 