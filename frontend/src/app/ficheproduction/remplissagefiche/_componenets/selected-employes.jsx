import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function SelectedEmployesCard({
  selectedEmployes,
  setSelectedEmployes,
}) {
  const handleRemoveEmploye = (indexToRemove) => {
    const updatedEmployes = selectedEmployes.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedEmployes(updatedEmployes);
    toast.info("Employe supprimée");
  };

  return (
    <div className="">
      <div className="border rounded-md">
        <div className="p-3 border-b bg-muted/50">
          <h3 className="font-medium"> employes sélectionné</h3>
        </div>
        {selectedEmployes.length === 0 ? (
          <div className="p-3 text-center text-muted-foreground">
            Aucun employe sélectionné
          </div>
        ) : (
          <div className="divide-y-1">
            {selectedEmployes.map((employe, index) => (
              <div
                key={index}
                className="p-3 flex justify-between items-center"
              >
                <Input
                  readOnly
                  type="hidden"
                  name="employes[]"
                  value={JSON.stringify(employe)} // Serialize the whole object
                  // value={employe.id_employe} // Serialize the whole object
                />
                <div className="flex justify-between items-center  w-full">
                  <div className="">
                    <div className="font-medium gap-3 flex">
                      <p>
                        {employe.nom_employe} {employe.prenom_employe}
                      </p>
                    </div>
                    {/* <div className="">
                      {employe.hours && (
                        <div className="text-sm  mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold">Details :</span>
                          <span>{employe.hours}</span>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveEmploye(index)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove {employe.nom_employe}</span>
                </Button>
              </div>
            ))}
          </div>
        )}
        {/* <div>{hours && }</div> */}
      </div>
      {/* {state?.errors?.selectedMaterials && (
        <p className="text-sm text-red-500">
          {state.errors.selectedMaterials[0]}
        </p>
      )} */}
    </div>
  );
}

{
  /* {product.height && (
                        <div className="text-sm mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold"> surface :</span>
                          <span>{product.height}</span>
                          <span>X</span>
                          <span>{product.width} </span>
                        </div>
                      )} */
}
