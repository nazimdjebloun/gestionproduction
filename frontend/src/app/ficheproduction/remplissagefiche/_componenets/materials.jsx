import React, { useState } from 'react'
import SelectEmploye from "../_componenets/select-employe";
import SelectMaterial from "../_componenets/select-material";
import SelectedEmployes from "../_componenets/selected-employes";
import SelectedMaterials from "../_componenets/selected-materials";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Materials() {
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    


  return (
    <div className="w-full space-y-5">
      <div className="flex justify-start gap-2 items-end">
        <SelectMaterial
          value={selectedMaterials}
          setValue={setSelectedMaterials}
        />
        <Button
          type="button"
          // onClick={handleAddProduct}
          className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
        >
          <PlusCircle className=" h-4 w-4" />
          <span className=" font-bold">Ajouter</span>
        </Button>
      </div>
      <SelectedMaterials selectedMaterials={selectedMaterials} />
    </div>
  );
}
