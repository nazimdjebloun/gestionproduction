import React from 'react'
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
import { Skeleton } from '@/components/ui/skeleton';
import { Edit2, MoreHorizontal, User } from "lucide-react";
export default function FolderTableBody({ paginatedData, isPending, isError }) {
  return (
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
          <TableCell colSpan={4} className="h-24 text-center text-red-500">
            Error loading client data: {error.message}
          </TableCell>
        </TableRow>
      ) : paginatedData.length > 0 ? (
        paginatedData.map((folder) => (
          <TableRow key={folder.id_dossier}>
            <TableCell className="font-medium">{folder.num_bc}</TableCell>
            <TableCell>{folder.id_client}</TableCell>
            <TableCell>{folder.date_creation}</TableCell>
            <TableCell>{folder.id_departement}</TableCell>
            <TableCell className="max-w-[300px] truncate">en cours</TableCell>
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
                    Affiche folder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit2 />
                    Modifier folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            Pas de dossier
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
