import { Card } from '@/components/ui/card';
import React from 'react'

export default function SelectedEmployes({ selectedEmployes }) {
  return (
    <div className="">
      <div className="border rounded-md">
        <div className="p-2 border-b bg-muted/50">
          <h3 className="font-medium"> employes sélectionné</h3>
        </div>
        {selectedEmployes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Aucun employe sélectionné
          </div>
        ) : (
          <div className="divide-y-1">
            {selectedEmployes.map((employe, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center"
              >
                <Input
                  readOnly
                  type="hidden"
                  name="products[]"
                  value={JSON.stringify(employe)} // Serialize the whole object
                />
                <div className="flex justify-between items-center  w-full">
                  <div className="">
                    <div className="font-medium gap-3 flex">
                      <p>{employe.nom_employe}</p>
                      <p>{employe.prenom_employe}</p>
                    </div>
                    {/* <div className="">
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
                  <span className="sr-only">
                    Remove {employe.designation_produit}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {state?.errors?.selectedMaterials && (
        <p className="text-sm text-red-500">
          {state.errors.selectedMaterials[0]}
        </p>
      )} */}
    </div>
  );
};