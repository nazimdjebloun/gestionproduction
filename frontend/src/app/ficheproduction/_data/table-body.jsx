import React from "react";
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
import Link from "next/link";

export default function FileTableBody({
  paginatedData,
  isPending,
  isError,
  handleEdit,
  handleView,
}) {
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
            Error dans le chargement des fichiers prod : {error.message}
          </TableCell>
        </TableRow>
      ) : paginatedData.length > 0 ? (
        paginatedData.map((file) => (
          <TableRow key={file.id_fiche_production}>
            <TableCell className="font-medium">{file.num_bc}</TableCell>
            <TableCell>{file.nom_client}</TableCell>
            <TableCell>{formatDateTime(file.date_creation_dossier)}</TableCell>
            <TableCell>{formatDateTime(file.date_creation)}</TableCell>
            <TableCell>{file.nom_departement}</TableCell>
            <TableCell>{file.nom_atelier}</TableCell>
            <TableCell className="max-w-[300px] truncate">
              {file.etat_fiche}
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
                  <Link
                    href={`./ficheproduction/afficagefiche/${file.id_fiche_production}`}
                  >
                    <DropdownMenuItem>
                      <User />
                      Affiche fiche
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEdit(file)}>
                    <Edit2 />
                    Modifier fiche
                  </DropdownMenuItem>
                  <Link
                    href={`./ficheproduction/remplissagefiche/${file.id_fiche_production}`}
                  >
                    <DropdownMenuItem onClick={() => handleView(file)}>
                      <User />
                      Mise a jour fiche
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center">
            Pas de fichier
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
