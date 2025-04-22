import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import SearchFilters from "./_data/search-filters";
import FileTable from "./_data/file-table";
// import FileTable from "./_data/file-table";

export default function FicheProduction() {
  return (
    <div className="w-full ">
      <div className="flex justify-between w-full p-2">
        <h1 className="text-3xl">Dossiers Client</h1>
        <Link href="./ficheproduction/creationficheproduction" prefetch={true}>
          <Button variant={"outline"}>
            <Plus />
            Ajouter une fiche production
          </Button>
        </Link>
      </div>
      <div>
        <FileTable />
      </div>
    </div>
  );
}
