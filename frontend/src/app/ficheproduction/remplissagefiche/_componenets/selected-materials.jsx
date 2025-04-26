import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function SelectedMaterialsCard({
  selectedMaterials,
  setSelectedMaterials,
}) {
  const handleRemoveMaterial = (indexToRemove) => {
    const updatedMaterials = selectedMaterials.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedMaterials(updatedMaterials);
    toast.info("Matière supprimée");
  };

  return (
    <div className="">
      <div className="border rounded-md">
        <div className="p-3 border-b bg-muted/50">
          <h3 className="font-medium">Materiaux sélectionné</h3>
        </div>
        {Array.isArray(selectedMaterials) && selectedMaterials.length === 0 ? (
          <div className="p-3 text-center text-muted-foreground">
            Aucune matière sélectionnée
          </div>
        ) : (
          Array.isArray(selectedMaterials) && (
            <div className="divide-y-1">
              {selectedMaterials.map((material, index) => (
                <div
                  key={index}
                  className="p-3 flex justify-between items-center"
                >
                  <Input
                    readOnly
                    type="hidden"
                    name="materials[]"
                    value={JSON.stringify(material)} // Serialize the whole object
                    // value={material.id_matiere} // Serialize the whole object
                  />
                  <div className="flex justify-between items-center  w-full">
                    <div className="">
                      <div className="font-medium gap-3 flex">
                        <span className="font-bold">{material.quantity}</span>
                        <p>{material.designation_matiere}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMaterial(index)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Remove {material.id_matiere}
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          )
        )}
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
  /* <div className="">
                      {material.productDetails && (
                        <div className="text-sm  mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold">Details :</span>
                          <span>{product.productDetails}</span>
                        </div>
                      )}

                      {product.height && (
                        <div className="text-sm mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold"> surface :</span>
                          <span>{product.height}</span>
                          <span>X</span>
                          <span>{product.width} </span>
                        </div>
                      )}
                    </div> */
}
