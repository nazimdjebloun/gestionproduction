import React from 'react'
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SelectedProductsCard({
  selectedProducts,
  handleRemoveProduct,
  state,
}) {
  return (
    <div>
      <div className="border rounded-md">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="font-medium">Selected Products</h3>
        </div>
        {selectedProducts.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Aucun produit sélectionné
          </div>
        ) : (
          <div className="divide-y-1">
            {selectedProducts.map((product, index) => (
              <div
                key={product.uniqueId}
                className="p-4 flex justify-between items-center"
              >
                <Input
                  readOnly
                  type="hidden"
                  name="products[]"
                  value={JSON.stringify(product)} // Serialize the whole object
                />
                <div className="flex justify-between items-center  w-full">
                  <div className="">
                    <div className="font-medium gap-3 flex">
                      <span className="font-bold">{product.quantity}</span>
                      <p>{product.name}</p>
                    </div>
                    <div className="">
                      {product.productDetails && (
                        <div className="text-sm  mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold">Details :</span>
                          <span>{product.productDetails}</span>
                        </div>
                      )}

                      {product.surface && (
                        <div className="text-sm mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold"> surface :</span>
                          <span>{product.surface.height}</span>
                          <span>X</span>
                          <span>{product.surface.width} </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveProduct(product.uniqueId)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove {product.name}</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {state?.errors?.selectedProducts && (
        <p className="text-sm text-red-500">
          {state.errors.selectedProducts[0]}
        </p>
      )}
    </div>
  );
}
