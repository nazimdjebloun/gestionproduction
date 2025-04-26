import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit2, MoreHorizontal, User } from "lucide-react";
import { formatDateTime } from "@/utils/formateDate";
import FolderFiles from "../_components/folder-files";

export default function FolderTableBody({
  paginatedData,
  isPending,
  isError,
  handleView,
  handlePv,
}) {
  return (
    <>
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
              <TableCell>
                <Skeleton className="h-6 w-[250px]" />
              </TableCell>
            </TableRow>
          ))
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center text-red-500">
              Error loading client data: {error.message}
            </TableCell>
          </TableRow>
        ) : paginatedData.length > 0 ? (
          paginatedData.map((folder) => (
            <TableRow key={folder.id_dossier}>
              <TableCell className="font-medium">{folder.num_bc}</TableCell>
              <TableCell>{folder.nom_client}</TableCell>
              <TableCell>{formatDateTime(folder.date_creation)}</TableCell>
              <TableCell>{folder.nom_departement}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {folder.etat_dossier}
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
                    <DropdownMenuItem
                      onClick={() => {
                        handleView(folder.id_dossier);
                      }}
                    >
                      <User />
                      Affiche dossier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handlePv(folder.id_dossier)}
                    >
                      <Edit2 />
                      Affiche PV reserve
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Pas de dossier
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
}
