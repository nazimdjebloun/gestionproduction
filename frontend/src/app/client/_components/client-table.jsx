"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, MoreHorizontal, Search, SlidersHorizontal, Trash2,User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/pagination";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import EditClient from "./edit-client";

const fetchClients = async () => {
  const response = await axiosInstance.get("/api/clients");
  console.log(response.data.data);
  return response.data.data;
};

export default function ClientTable({  }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;



  useEffect(() => {
    console.log(selectedClient);
  }, [selectedClient]);
  // const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  // reset sorte to default to created at
  const handleResetSort = () => {
    setSortField("");
    setSortDirection("asc");
    setCurrentPage(1)
  }

  // Handle opening edit dialog
  const handleEdit = (client) => {
    setTimeout(() => {
      setSelectedClient(client);
      setEditDialogOpen(true);
    }, 10); // Tiny delay gives DropdownMenu time to close
  };

  // Handle closing edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  // Render sort icon
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const filteredAndSortedData = Array.isArray(data)
    ? [...data]
        // Filter by search query
        .filter((client) => {
          if (!searchQuery.trim()) return true;
          if (!client) return false;

          const query = searchQuery.toLowerCase();
          return (
            (client.nom_client || "").toLowerCase().includes(query) ||
            (client.email_client || "").toLowerCase().includes(query) ||
            (client.tel_client || "").toLowerCase().includes(query) ||
            (client.adresse_client || "").toLowerCase().includes(query)
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

  // Paginate data
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
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Rechercher des clients..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-3"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {sortField && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Trié par:{" "}
              <span className="font-medium text-foreground capitalize">
                {sortField.replace("_client", "")}
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
      </div>

      <div className="w-full">
        <Card className="p-0 overflow-auto">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("nom_client")}
                >
                  <div className="flex items-center">
                    Nom
                    {renderSortIcon("nom_client")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("email_client")}
                >
                  <div className="flex items-center">
                    Email
                    {renderSortIcon("email_client")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("tel_client")}
                >
                  <div className="flex items-center">
                    Téléphone
                    {renderSortIcon("tel_client")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("adresse_client")}
                >
                  <div className="flex items-center">
                    Adresse
                    {renderSortIcon("adresse_client")}
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-background ">
              {isPending ? (
                Array.from({ length: 15 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[200px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[250px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-red-500"
                  >
                    Error loading client data: {error.message}
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((client) => (
                  <TableRow key={client.id_client}>
                    <TableCell className="font-medium">
                      {client.nom_client}
                    </TableCell>
                    <TableCell>{client.email_client}</TableCell>
                    <TableCell>{client.tel_client}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {client.adresse_client}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 ">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <User />
                            Affiche client
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleEdit(client)}
                          >
                            <Edit2 />
                            Modifier client
                            {/* <EditClient
                              client={selectedClient}
                              editDialogOpen={editDialogOpen}
                              Close={handleCloseEditDialog}
                            /> */}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No clients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
        <div className="p-4 ">
          {filteredAndSortedData && filteredAndSortedData.length > 0 && (
            <div className="">
              <div className="text-sm text-muted-foreground w-[100%]">
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedData.length
                )}{" "}
                sur {filteredAndSortedData.length} clients
              </div>

              <Pagination className="w-full flex justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNum, index) => {
                    if (pageNum === "ellipsis") {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={currentPage === pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      {selectedClient && (
        <EditClient
          client={selectedClient}
          editDialogOpen={editDialogOpen}
          Close={handleCloseEditDialog}
          setEditDialogOpen={setEditDialogOpen}
        />
      )}
    </div>
  );
}



  // const handleDelete = async (id) => {
  //   const result = await DeleteClientAction(id);
  //   if (result?.success) {
  //     toast.success("Client supprimé");
  //     queryClient.refetchQueries({ queryKey: ["clients"], type: "active" });
  //   } else {
  //     toast.error("Erreur lors de la suppression");
  //   }
  // };