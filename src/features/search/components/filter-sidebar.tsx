"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "../types/search.types";
import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  initialFilters?: Partial<SearchFilters>;
  onFilterChange: (filters: SearchFilters) => void;
}

const RELIGIONS = ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Parsi", "Buddhist", "Jewish"];
const MARITAL_STATUS = ["Never Married", "Divorced", "Widowed", "Awaiting Divorce"];
const EDUCATION = ["Bachelors", "Masters", "Doctorate", "Diploma", "Undergraduate"];

export function FilterSidebar({ initialFilters, onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    ageRange: initialFilters?.ageRange || [21, 40],
    religion: initialFilters?.religion || [],
    caste: initialFilters?.caste || [],
    profession: initialFilters?.profession || [],
    city: initialFilters?.city || "",
    education: initialFilters?.education || [],
    income: initialFilters?.income || [],
    maritalStatus: initialFilters?.maritalStatus || [],
    page: 1,
  });

  const handleCheckboxChange = (field: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters((prev) => {
      const currentList = (prev[field] as string[]) || [];
      const newList = checked 
        ? [...currentList, value] 
        : currentList.filter((item) => item !== value);
      
      return { ...prev, [field]: newList };
    });
  };

  const handleApply = () => {
    onFilterChange({ ...filters, page: 1 });
  };

  const handleReset = () => {
    const resetState = {
      ageRange: [18, 50] as [number, number],
      religion: [],
      caste: [],
      profession: [],
      city: "",
      education: [],
      income: [],
      maritalStatus: [],
      page: 1,
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-2 text-muted-foreground hover:text-foreground">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
        </Button>
      </div>

      {/* Age Range Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-semibold">Age Range</Label>
          <span className="text-xs text-muted-foreground font-medium">
            {filters.ageRange[0]} - {filters.ageRange[1]} yrs
          </span>
        </div>
        <Slider
          value={filters.ageRange}
          min={18}
          max={70}
          step={1}
          onValueChange={(val) => setFilters(prev => ({ ...prev, ageRange: val as [number, number] }))}
          className="pt-2"
        />
      </div>

      {/* Marital Status */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Marital Status</Label>
        <div className="space-y-2.5">
          {MARITAL_STATUS.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox 
                id={`status-${status}`} 
                checked={filters.maritalStatus.includes(status)}
                onCheckedChange={(checked) => handleCheckboxChange('maritalStatus', status, checked as boolean)}
              />
              <label htmlFor={`status-${status}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Religion */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Religion</Label>
        <div className="space-y-2.5 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {RELIGIONS.map((rel) => (
            <div key={rel} className="flex items-center space-x-2">
              <Checkbox 
                id={`rel-${rel}`} 
                checked={filters.religion.includes(rel)}
                onCheckedChange={(checked) => handleCheckboxChange('religion', rel, checked as boolean)}
              />
              <label htmlFor={`rel-${rel}`} className="text-sm leading-none cursor-pointer">
                {rel}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Education</Label>
        <div className="space-y-2.5">
          {EDUCATION.map((edu) => (
            <div key={edu} className="flex items-center space-x-2">
              <Checkbox 
                id={`edu-${edu}`} 
                checked={filters.education.includes(edu)}
                onCheckedChange={(checked) => handleCheckboxChange('education', edu, checked as boolean)}
              />
              <label htmlFor={`edu-${edu}`} className="text-sm leading-none cursor-pointer">
                {edu}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* City Search */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">City</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="e.g. Mumbai, New York" 
            className="pl-9 bg-muted/50"
            value={filters.city || ""}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
          />
        </div>
      </div>

      <Button className="w-full" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );
}
