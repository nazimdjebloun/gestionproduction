import React, { useEffect, useState } from "react";
import SelectEmploye from "../_componenets/select-employe";
import SelectedEmployesCard from "../_componenets/selected-employes";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useEmployes } from "@/hooks/fetsh-data";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Employes({ state }) {
  const [selectedEmployes, setSelectedEmployes] = useState([]);
  const [selectedEmployeId, setSelectedEmployeId] = useState(null);
  const [hours, setHours] = useState(1);
  const { data: employes, isLoading, refresh } = useEmployes();

  const handleAddEmployes = () => {
    if (!selectedEmployeId) {
      toast.error("pas de employe selectionne");
      return;
    }

    const isDuplicate = selectedEmployes.some(
      (employe) => employe.id_employe === selectedEmployeId
    );

    if (isDuplicate) {
      const duplicate = employes.find(
        (e) => e.id_employe === selectedEmployeId
      );
      toast.warning(
        `${duplicate?.nom_employe ?? "employes"} est deja dans la liste`
      );
      return;
    }
    const employesToAdd = employes.find(
      (e) => e.id_employe === selectedEmployeId
    );

    if (!employesToAdd) return;
    const newEmploye = {
      ...employesToAdd,
      // quantity,
    };

    setSelectedEmployes([...selectedEmployes, newEmploye]);
    setSelectedEmployeId("");

    toast.success(`${employesToAdd.nom_employe} ajouter `);
  };

  return (
    <Card className="w-full p-5">
      <CardTitle>Infomation employes</CardTitle>
      <CardDescription>
        selectionnes les employes assoscier a cette fiche de production et le
        total d'heurs travailler
      </CardDescription>
      <CardContent className="p-0 w-full space-y-5">
        <div className="flex justify-between items-end gap-3">
          <div className="flex-grow">
            <SelectEmploye
              employes={employes}
              isLoading={isLoading}
              selectedEmployes={selectedEmployes}
              setSelectedEmployes={setSelectedEmployes}
              selectedEmployeId={selectedEmployeId}
              setSelectedEmployeId={setSelectedEmployeId}
            />
          </div>
          <Button
            type="button"
            onClick={handleAddEmployes}
            className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
          >
            <PlusCircle className=" h-4 w-4" />
            <span className=" font-bold">Ajouter</span>
          </Button>
        </div>

        <SelectedEmployesCard
          selectedEmployes={selectedEmployes}
          setSelectedEmployes={setSelectedEmployes}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedEmployes([])}
            disabled={selectedEmployes.length === 0}
          >
            Supprimer tous
          </Button>
          <div className=" ">
            <Label className="p-1 text-base">Total des Heurs </Label>
            <Input
              name="hours"
              type="number"
              placeholder="hours"
              value={hours}
              min={1}
              onChange={(e) => setHours(e.target.value)}
              className="w-full "
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
