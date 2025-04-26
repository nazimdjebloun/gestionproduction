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
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FileTableHeader({
  // handleSort, renderSortIcon
  setSortDirection,
  setSortField,
  setCurrentPage,
  sortField,
  sortDirection,
}) {
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

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
          onClick={() => handleSort("date_creation_dossier")}
        >
          <div className="flex items-center">
            Date creation dossier
            {renderSortIcon("date_creation_dossier")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("date_creation")}
        >
          <div className="flex items-center">
            Date creation fichier prod
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
          onClick={() => handleSort("nom_atelier")}
        >
          <div className="flex items-center">
            Atelier
            {renderSortIcon("nom_atelier")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => handleSort("etat_fiche")}
        >
          <div className="flex items-center">
            Etas
            {renderSortIcon("etat_fiche")}
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
