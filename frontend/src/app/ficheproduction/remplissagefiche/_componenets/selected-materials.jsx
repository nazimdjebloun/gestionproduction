import { Card, CardTitle } from '@/components/ui/card';
import React from 'react'

export default function SelectedMaterials({ selectedMaterials }) {
  return (
    <div className="">
      <div className="border rounded-md">
        <div className="p-2 border-b bg-muted/50">
          <h3 className="font-medium">Selected Products</h3>
        </div>
        {selectedMaterials.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Aucune matiare sélectionné
          </div>
        ) : (
          <div className="divide-y-1">
            {selectedMaterials.map((material, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center"
              >
                <Input
                  readOnly
                  type="hidden"
                  name="products[]"
                  value={JSON.stringify(material)} // Serialize the whole object
                />
                <div className="flex justify-between items-center  w-full">
                  <div className="">
                    <div className="font-medium gap-3 flex">
                      <span className="font-bold">{material.quantity}</span>
                      <p>{material.designation_produit}</p>
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
                  onClick={() => handleRemoveMaterial(index)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">
                    Remove {material.designation_produit}
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
}


