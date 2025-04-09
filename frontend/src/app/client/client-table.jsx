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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, MoreHorizontal, SlidersHorizontal, Trash2,User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/pagination";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeleteClientAction from "@/actions/client/delete-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchClients = async () => {
  const response = await axiosInstance.get("/api/clients");
  console.log(response.data.data);
  return response.data.data;
};

export default function ClientTable() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const handleDelete = async (id) => {
    const result = await DeleteClientAction(id);
    if (result?.success) {
      toast.success("Client supprimé");
      queryClient.refetchQueries({ queryKey: ["clients"], type: "active" });
    } else {
      toast.error("Erreur lors de la suppression");
    }
  };
  


  // if (isError) {
  //   return (
  //     <div className="text-red-500">
  //       Error loading client data: {error.message}
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Search clients..."
            // value={searchQuery}
            // onChange={(e) => {
            //   setSearchQuery(e.target.value);
            //   setCurrentPage(1); // Reset to first page on new search
            // }}
            className="pl-3 pr-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem
            //   onClick={() => setSortField("name")}
            >
              Filter par Nom
            </DropdownMenuItem>
            <DropdownMenuItem
            //   onClick={() => setSortField("email")}
            >
              Filter par Email
            </DropdownMenuItem>
            <DropdownMenuItem
            //   onClick={() => setSortField("telephone")}
            >
              Filter par Telephone
            </DropdownMenuItem>
            <DropdownMenuItem
            //   onClick={() => setSortField("address")}
            >
              Filter par Address
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <Card className="p-0 overflow-auto">
          <Table className="">
            <TableHeader>
              <TableRow className="">
                <TableHead
                  className="cursor-pointer "
                  // onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {/* {renderSortIcon("name")} */}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  // onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Email
                    {/* {renderSortIcon("email")} */}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  // onClick={() => handleSort("telephone")}
                >
                  <div className="flex items-center">
                    Telephone
                    {/* {renderSortIcon("telephone")} */}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  // onClick={() => handleSort("address")}
                >
                  <div className="flex items-center">
                    Address
                    {/* {renderSortIcon("address")} */}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  // onClick={() => handleSort("address")}
                >
                  <div className="flex items-center">
                    Action
                    {/* {renderSortIcon("address")} */}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-background ">
              {isPending ? (
                Array.from({ length: 5 }).map((_, index) => (
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
              ) : data.length > 0 ? (
                data.map((client) => (
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
                          <Button variant="ghost" className="h-8 w-8 p-0">
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
                          <DropdownMenuItem>
                            <Edit2 />
                            Modifier client
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className=" "
                            onClick={() => handleDelete(client.id_client)}
                          >
                            <Trash2 className="text-red-400" />
                            Supprimer client
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
      </div>
    </div>
  );
}
