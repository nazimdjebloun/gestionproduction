"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function PvTableHeader({
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
          className="cursor-pointer w-[150px]"
          onClick={() => handleSort("num_bc")}
        >
          <div className="flex items-center">
            Num BC
            {renderSortIcon("num_bc")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer min-w-[200px]"
          onClick={() => handleSort("nom_client")}
        >
          <div className="flex items-center">
            Client
            {renderSortIcon("nom_client")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer w-[180px]"
          onClick={() => handleSort("date_creation")}
        >
          <div className="flex items-center">
            Date PV
            {renderSortIcon("date_creation")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer min-w-[150px]"
          onClick={() => handleSort("nom_departement")}
        >
          <div className="flex items-center">
            Département
            {renderSortIcon("nom_departement")}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer w-[120px]"
          onClick={() => handleSort("etat_pv")}
        >
          <div className="flex items-center">
            Statut
            {renderSortIcon("etat_pv")}
          </div>
        </TableHead>
        <TableHead className="w-[100px]">
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
