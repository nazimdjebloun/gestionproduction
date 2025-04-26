"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,

} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/pagination";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

import FolderTableFooter from "./table-footer";
import FolderTableHeader from "./table-head";
import FolderTableBody from "./table-body";
import { formatDateTime } from "@/utils/formateDate";
import SearchFilters from "./search-filters";
import FolderFiles from "../_components/folder-files";
import FolderPv from "../_components/folder-pv";

const fetchFolders = async () => {
  const response = await axiosInstance.get("/api/clientfolders");
  // console.log(response.data.data);
  return response.data.data;
};

export default function FolderTable() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [filteredAndSortedData, setFilteredAndSortedData] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  // const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [pvDialogOpen, setPvDialogOpen] = useState(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["Folders"],
    queryFn: fetchFolders,
  });

  // const handleEdit = (folder) => {
  //   setTimeout(() => {
  //     setSelectedFolder(folder);
  //     setEditDialogOpen(true);
  //   }, 10);
  // };

  // useEffect(() => {
  //   console.log("viewDialogOpen : ", viewDialogOpen);
  // }, [viewDialogOpen]);

  const handleView = (folder) => {
    setTimeout(() => {
      setSelectedFolder(folder);
      setViewDialogOpen(true);
    }, 10);
  };

  const handlePv = (folder) => {
    setTimeout(() => {
      setSelectedFolder(folder);
      setPvDialogOpen(true);
    }, 10);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedFolder(null);
  };

  const handleClosePvDialog = () => {
    setPvDialogOpen(false);
    setSelectedFolder(null);
  };
  // useEffect(() => {
  //   console.log(selectedFolder);
  // }, [selectedFolder]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredAndSortedData = Array.isArray(data)
    ? [...data]
        // Filter by search query
        .filter((folder) => {
          if (!searchQuery.trim()) return true;
          if (!folder) return false;

          const query = searchQuery.toLowerCase();
          // Format the date for comparison
          const formattedDate = folder.date_creation
            ? formatDateTime(folder.date_creation).toLowerCase()
            : "";
          return (
            (folder.num_bc || "").toLowerCase().includes(query) ||
            (folder.nom_client || "").toLowerCase().includes(query) ||
            (folder.nom_departement || "").toLowerCase().includes(query) ||
            (folder.etas || "").toLowerCase().includes(query) ||
            // (folder.date_creation || "").toLowerCase().includes(query)
            formattedDate.includes(query)
          );
        })

        // Sort by selected field
        .sort((a, b) => {
          if (!a || !b) return 0;

          const valueA = (a[sortField] || "").toLowerCase();
          const valueB = (b[sortField] || "").toLowerCase();

          if (sortDirection === "asc") {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        })
    : [];

  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedData.length / itemsPerPage)
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Show ellipsis after first page if current page is > 3
      if (currentPage > 3) {
        pageNumbers.push("ellipsis");
      }

      // Show current page and adjacent pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Show ellipsis before last page if needed
      if (currentPage < totalPages - 2) {
        pageNumbers.push("ellipsis");
      }

      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="space-y-4 w-full px-2 ">
      <SearchFilters
        setCurrentPage={setCurrentPage}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="w-full ">
        <Card className="p-0 overflow-auto">
          <Table className="">
            <FolderTableHeader
              setSortDirection={setSortDirection}
              setSortField={setSortField}
              setCurrentPage={setCurrentPage}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <FolderTableBody
              paginatedData={paginatedData}
              // handleEdit={handleEdit}
              handleView={handleView}
              handlePv={handlePv}
              isPending={isPending}
              isError={isError}
            />
          </Table>
        </Card>
        {selectedFolder && (
          <>
            <FolderFiles
              viewDialogOpen={viewDialogOpen}
              handleCloseViewDialog={handleCloseViewDialog}
              folderId={selectedFolder}
            />
            <FolderPv
              pvDialogOpen={pvDialogOpen}
              handleClosePvDialog={handleClosePvDialog}
              folderId={selectedFolder}
            />
          </>
        )}

        {/* {selectedFolder && ( )} */}
        <FolderTableFooter
          filteredAndSortedData={filteredAndSortedData}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          getPageNumbers={getPageNumbers}
        />
      </div>
    </div>
  );
}

// const handleResetSort = () => {
//   setSortField("");
//   setSortDirection("asc");
//   setCurrentPage(1);
// };

// const renderSortIcon = (field) => {
//   if (sortField !== field) return null;
//   return sortDirection === "asc" ? (
//     <ChevronUp className="ml-1 h-4 w-4" />
//   ) : (
//     <ChevronDown className="ml-1 h-4 w-4" />
//   );
// };

// const handleSort = (field) => {
//   if (sortField === field) {
//     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//   } else {
//     setSortField(field);
//     setSortDirection("asc");
//   }

//   setCurrentPage(1);
// };

{
  /* <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Input
              placeholder="Rechercher des dossier..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {sortField && (
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
        )}
      </div> */
}