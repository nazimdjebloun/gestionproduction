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
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  User,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// import { Pagination } from "@/components/pagination";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";


export default function FolderTableHeader({ handleSort, renderSortIcon }) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("num_bc")}
        >
          <div className="flex items-center">
            Num BC
            {renderSortIcon("num_bc")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("nom_client")}
        >
          <div className="flex items-center">
            Nom client
            {renderSortIcon("nom_client")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("date_creation")}
        >
          <div className="flex items-center">
            Date creation
            {renderSortIcon("date_creation")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("nom_departement")}
        >
          <div className="flex items-center">
            Departement
            {renderSortIcon("nom_departement")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          // onClick={() => handleSort("adresse_client")}
        >
          <div className="flex items-center">
            Etas
            {/* {renderSortIcon("adresse_client")} */}
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center">Actions</div>
        </TableHead>
      </TableRow>
    </TableHeader>
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
