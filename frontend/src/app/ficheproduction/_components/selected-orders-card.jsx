import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SelectedOrdersCard({ orders, setSelectedOrders }) {
  const handleRemoveProduct = (id_detail_commande) => {
    setSelectedOrders(
      orders.filter((p) => p.id_detail_commande !== id_detail_commande)
    );
    toast("Product removed");
  };

  return (
    <div>
      <div className="border rounded-md">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="font-medium">Selected Products</h3>
        </div>
        {orders.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Aucune commande sélectionné
          </div>
        ) : (
          <div className="divide-y-1">
            {orders.map((order, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center"
              >
                <Input
                  readOnly
                  type="hidden"
                  name="orders[]"
                  value={JSON.stringify(order)} // Serialize the whole object
                />
                <div className="flex justify-between items-center  w-full">
                  <div className="">
                    <div className="font-medium gap-3 flex">
                      <span className="font-bold">{order.quantite}</span>
                      <p>{order.id_produit}</p>
                    </div>
                    <div className="">
                      {order.details && (
                        <div className="text-sm  mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold">Details :</span>
                          <span>{order.details}</span>
                        </div>
                      )}

                      {order.height && (
                        <div className="text-sm mt-1 text-muted-foreground space-x-2">
                          <span className="font-bold"> surface :</span>
                          <span>{order.epaisseur}</span>
                          <span>X</span>
                          <span>{order.largeur} </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveProduct(order.id_detail_commande)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">
                    Remove {order.designation_produit}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
