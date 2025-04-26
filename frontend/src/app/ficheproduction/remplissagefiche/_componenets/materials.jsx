import React, { useEffect, useState } from "react";
import SelectEmploye from "../_componenets/select-employe";
import SelectMaterial from "../_componenets/select-material";
import SelectedEmployes from "../_componenets/selected-employes";
import SelectedMaterialsCard from "../_componenets/selected-materials";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMaterials } from "@/hooks/fetsh-data";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Materials({ state }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { data: materials, isLoading, refresh } = useMaterials();

  const handleAddMaterial = () => {
    if (!selectedMaterialId) {
      toast.error("pas de  matiere selectionne");
      return;
    }

    const isDuplicate = selectedMaterials.some(
      (material) => material.id_matiere === selectedMaterialId
    );

    if (isDuplicate) {
      const duplicate = materials.find(
        (m) => m.id_matiere === selectedMaterialId
      );
      toast.warning(
        `${duplicate?.designation_matiere ?? "Material"} est deja dans la liste`
      );
      return;
    }
    const materialToAdd = materials.find(
      (m) => m.id_matiere === selectedMaterialId
    );

    if (!materialToAdd) return;
    const newMaterial = {
      ...materialToAdd,
      quantity: Number(quantity) || 1,
    };

    setSelectedMaterials([...selectedMaterials, newMaterial]);
    setSelectedMaterialId("");
    setQuantity(1);

    toast.success(`${materialToAdd.designation_matiere} ajouter `);
  };
  useEffect(() => {
    if (state?.success === true) {
      toast.success(state?.message);
      setSelectedMaterialId("");
      setSelectedMaterials([]);
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);
  // useEffect(() => {
  //   console.log("selectedMaterials : ", selectedMaterials);
  //   console.log("selectedMaterials id  : ", selectedMaterialId);
  // }, [selectedMaterials, selectedMaterialId]);
  return (
    <Card className="w-full p-5">
      <CardTitle>Infomation matiere premiere </CardTitle>
      <CardDescription>
        selectionnes la mateiere premiere utiliser a cette fiche de production
        et la quentite de chaque matiere
      </CardDescription>
      <CardContent className="p-0 w-full space-y-5">
        <div className="flex justify-start gap-2 items-end">
          <div className="flex-grow">
            <SelectMaterial
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              selectedMaterialId={selectedMaterialId}
              setSelectedMaterialId={setSelectedMaterialId}
              materials={materials}
              isLoading={isLoading}
            />
          </div>
          <div className="">
            <Label htmlFor="quantity" className="p-1">
              Quantite utilise
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantité"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full sm:w-[150px]"
            />
          </div>
          <Button
            type="button"
            onClick={handleAddMaterial}
            className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
          >
            <PlusCircle className=" h-4 w-4" />
            <span className=" font-bold">Ajouter</span>
          </Button>
        </div>

        <SelectedMaterialsCard
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setSelectedMaterials([])}
          disabled={selectedMaterials.length === 0}
        >
          Supprimer tous
        </Button>
      </CardContent>
    </Card>
  );
}
