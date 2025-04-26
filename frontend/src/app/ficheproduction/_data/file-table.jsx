"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/pagination";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

import { formatDateTime } from "@/utils/formateDate";
import SearchFilters from "./search-filters";
import FileTableFooter from "./table-footer";
import FileTableBody from "./table-body";
import FileTableHeader from "./table-header";
import { useFiles } from "@/hooks/fetsh-data";

export default function FileTable() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [filteredAndSortedData, setFilteredAndSortedData] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["Folders"],
  //   queryFn: fetchFolders,
  // });

  const { data: data, isPending, isError, refresh } = useFiles();
  const handleEdit = (file) => {
    setTimeout(() => {
      setSelectedFile(file);
      setEditDialogOpen(true);
    }, 10); // Tiny delay gives DropdownMenu time to close
  };

  const handleView = (file) => {
    // setTimeout(() => { }, 10);
    setSelectedFile(file);
    // console.log(file);
  };

  const handleSelection = (file) => {
    setSelectedFile(file);
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredAndSortedData = Array.isArray(data)
    ? [...data]
        // Filter by search query
        .filter((file) => {
          if (!searchQuery.trim()) return true;
          if (!file) return false;

          const query = searchQuery.toLowerCase();
          // Format the date for comparison
          const formattedFileDate = file.date_creation
            ? formatDateTime(file.date_creation).toLowerCase()
            : "";
          const formattedFolderDate = file.date_creation_dossier
            ? formatDateTime(file.date_creation_dossier).toLowerCase()
            : "";
          return (
            (file.num_bc || "").toLowerCase().includes(query) ||
            (file.nom_client || "").toLowerCase().includes(query) ||
            (file.nom_departement || "").toLowerCase().includes(query) ||
            (file.nom_atelier || "").toLowerCase().includes(query) ||
            (file.etas || "").toLowerCase().includes(query) ||
            // (folder.date_creation || "").toLowerCase().includes(query)
            formattedFileDate.includes(query) ||
            formattedFolderDate.includes(query)
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
            <FileTableHeader
              setSortDirection={setSortDirection}
              setSortField={setSortField}
              setCurrentPage={setCurrentPage}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <FileTableBody
              paginatedData={paginatedData}
              handleEdit={handleEdit}
              handleView={handleView}
              isPending={isPending}
              isError={isError}
            />
          </Table>
        </Card>
        <FileTableFooter
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
