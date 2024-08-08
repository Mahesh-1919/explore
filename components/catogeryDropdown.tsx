"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { CategoriesData } from "@/utils/types";
import { getCategories } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<CategoriesData | null>
  >;
  selectedStatus: CategoriesData | null;
};

export default function ComboboxPopover({
  setSelectedStatus,
  selectedStatus,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const [Categories, setCategories] = useState<CategoriesData[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const data: any = await getCategories();
      setCategories(data);
    };
    fetchdata();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Category</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.name}</> : <>catogries</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={(value) => {
                      setSelectedStatus(
                        Categories.find(
                          (priority) => priority.name === value
                        ) || null
                      );
                      setOpen(false);
                    }}
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
