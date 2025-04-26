import React from "react";
import {
  Table,
  TableBody,
  TableCell,
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
import { Edit2, MoreHorizontal, FileText } from "lucide-react";
import { formatDateTime } from "@/utils/formateDate";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PvTableBody({ paginatedData, isPending, isError, handleSelectedPv }) {
  // const [selectedPvId, setSelectedPvId] = React.useState(null);
  // const [isPvModalOpen, setIsPvModalOpen] = React.useState(false);

  // const handleViewReservation = (pvId) => {
  //   setSelectedPvId(pvId);
  //   setIsPvModalOpen(true);
  // };

  return (
    <>
      <TableBody className="bg-background">
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
                <Skeleton className="h-6 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[50px]" />
              </TableCell>
            </TableRow>
          ))
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center text-red-500">
              Error loading PV data
            </TableCell>
          </TableRow>
        ) : paginatedData.length > 0 ? (
          paginatedData.map((pv) => (
            <TableRow key={pv.id_pv}>
              <TableCell className="font-medium">{pv.num_bc}</TableCell>
              <TableCell>{pv.nom_client}</TableCell>
              <TableCell>{formatDateTime(pv.date_creation)}</TableCell>
              <TableCell>{formatDateTime(pv.date_creation_dossier)}</TableCell>
              <TableCell>{pv.nom_departement}</TableCell>
              <TableCell>
                <Badge
                  variant={pv.etat_pv === "valide" ? "default" : "destructive"}
                >
                  {pv.etat_pv}
                </Badge>
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
                    <Link href={`./pvvalider/viewpvvalide/${pv.id_pv}`}>
                      <DropdownMenuItem
                        // onClick={() => handleSelectedPv(pv.id_pv)}
                      >
                        <FileText className="" />
                        Imprimer PV
                      </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuItem onClick={() => handleRejectPv(pv.id_pv)}>
                      <Edit2 className="" />
                      Rejeter
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Aucun PV trouvé
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      {/* PV Reservation Modal */}
      {/* <PvReservationModal
        pvId={selectedPvId}
        isOpen={isPvModalOpen}
        onClose={() => setIsPvModalOpen(false)}
      /> */}
    </>
  );
}
