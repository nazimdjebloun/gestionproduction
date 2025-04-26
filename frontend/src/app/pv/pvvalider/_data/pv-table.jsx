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

import PvTableFooter from "./table-footer";
import PvTableHeader from "./table-head";
import PvTableBody from "./table-body";
import { formatDateTime } from "@/utils/formateDate";
import SearchFilters from "./search-filters";
import { useValidatedPVs } from "@/hooks/fetsh-data";



export default function PvValideTable({  }) {
  const [searchQuery, setSearchQuery] = useState("");
  // const [filteredAndSortedData, setFilteredAndSortedData] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  // const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPv, setSelectedPv] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // const [rejectDialogOpen, seRejectDialogOpen] = useState(false);
  // const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const { data: data, isPending, isError, refresh } = useValidatedPVs();
  const [selectedPvData, setSelectedPvData] = React.useState(null);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const handleSelectedPv = (Pv) => {
  //   setSelectedPv(Pv);
  //   console.log(Pv);
  // };

  // const handleSelectedPv = async (pvId) => {
  //   try {
  //     const response = await fetch(`/api/pvs/${pvId}`); // your API route to get full PV
  //     // const data = await response.json();
  //     setSelectedPvData(response);
  //     console.log("DAATA", response);

  //     // Wait a bit for the component to render then print
  //     // setTimeout(() => {
  //     //   window.print();
  //     // }, 500);
  //   } catch (error) {
  //     console.error("Failed to fetch PV details:", error);
  //   }
  // };

const handleSelectedPv = async (pvId) => {
  try {
    // Make the request with axios
    const response = await axiosInstance(`/api/pvs/${pvId}`);

    // The data is available directly in response.data, no need to call .json()
    const data = response.data; // Axios automatically parses the JSON response
    setSelectedPvData(data);

    // Optional: wait a bit and then print
    setTimeout(() => {
      window.print();
    }, 500);
  } catch (error) {
    // Log the error, check if the error response contains details
    console.error(
      "Failed to fetch PV details:",
      error.response ? error.response.data.message : error.message
    );
  }
};



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredAndSortedData = Array.isArray(data)
    ? [...data]
        // Filter by search query
        .filter((pv) => {
          if (!searchQuery.trim()) return true;
          if (!pv) return false;

          const query = searchQuery.toLowerCase();
          // Format the date for comparison
          const formattedDate = pv.date_creation
            ? formatDateTime(pv.date_creation).toLowerCase()
            : "";
          const formattedDossierDate = pv.date_creation
            ? formatDateTime(pv.date_creation_dossier).toLowerCase()
            : "";
          return (
            (pv.num_bc || "").toLowerCase().includes(query) ||
            (pv.nom_client || "").toLowerCase().includes(query) ||
            (pv.nom_departement || "").toLowerCase().includes(query) ||
            (pv.etat_pv || "").toLowerCase().includes(query) ||
            // (folder.date_creation || "").toLowerCase().includes(query)
            formattedDate.includes(query) ||
            formattedDossierDate.includes(query)
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
            <PvTableHeader
              setSortDirection={setSortDirection}
              setSortField={setSortField}
              setCurrentPage={setCurrentPage}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <PvTableBody
              paginatedData={paginatedData}
              handleSelectedPv={handleSelectedPv}
              isPending={isPending}
              isError={isError}
            />
          </Table>
        </Card>

        {/* {selectedFolder && ( )} */}
        <PvTableFooter
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

  // {
  //   selectedPvData && (
  //     <div className="hidden print:block p-8">
  //       <h1 className="text-2xl font-bold mb-4">
  //         Procès-Verbal N° {selectedPvData.dossier.num_bc}
  //       </h1>

  //       <p>
  //         <strong>Client:</strong> {selectedPvData.client.nom_client}
  //       </p>
  //       <p>
  //         <strong>Adresse:</strong> {selectedPvData.client.adresse_client}
  //       </p>
  //       <p>
  //         <strong>Téléphone:</strong> {selectedPvData.client.tel_client}
  //       </p>

  //       <h2 className="text-xl font-semibold mt-6 mb-2">Détails:</h2>
  //       <table className="w-full border">
  //         <thead>
  //           <tr className="border">
  //             <th className="border p-2">Produit</th>
  //             <th className="border p-2">Quantité</th>
  //             <th className="border p-2">Largeur</th>
  //             <th className="border p-2">Épaisseur</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {selectedPvData.details.map((item) => (
  //             <tr
  //               key={item.detail_commande.id_detail_commande}
  //               className="border"
  //             >
  //               <td className="border p-2">
  //                 {item.produit.designation_produit}
  //               </td>
  //               <td className="border p-2">{item.detail_commande.quantite}</td>
  //               <td className="border p-2">
  //                 {item.detail_commande.largeur} mm
  //               </td>
  //               <td className="border p-2">
  //                 {item.detail_commande.epaisseur} mm
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }
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









  // useEffect(() => {
  //   console.log("viewDialogOpen : ", viewDialogOpen);
  // }, [viewDialogOpen]);

  // const handleView = (folder) => {
  //   setTimeout(() => {
  //     setSelectedFolder(folder);
  //     setViewDialogOpen(true);
  //   }, 10);
  // };

  // const handleCloseViewDialog = () => {
  //   setViewDialogOpen(false);
  //   setSelectedFolder(null);
  // };
  // useEffect(() => {
  //   console.log(selectedFolder);
  // }, [selectedFolder]);
