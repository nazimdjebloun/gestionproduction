import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateTime } from '@/utils/formateDate';
import { Search } from 'lucide-react';
import React from 'react'

export default function SearchFilters({
  // sortField,
  // setSortField,
  // setSortDirection,
  // sortDirection,
  // searchQuery,
  // setSearchQuery,
  // setCurrentPage,
}) {
  // const handleResetSort = () => {
  //   setSortField("");
  //   setSortDirection("asc");
  //   setCurrentPage(1);
  // };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Rechercher des Fichier production..."
            // value={searchQuery}
            // onChange={(e) => {
            //   setSearchQuery(e.target.value);
            //   setCurrentPage(1);
            // }}
            className="pl-10 pr-3"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* {sortField && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Trié par:{" "}
            <span className="font-medium text-foreground capitalize">
              {sortField}
            </span>
            {sortDirection === "desc" ? " (décroissant)" : " (croissant)"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetSort}
            className="h-8 px-2"
          >
            Réinitialiser
          </Button>
        </div>
      )} */}
    </div>
  );
}
