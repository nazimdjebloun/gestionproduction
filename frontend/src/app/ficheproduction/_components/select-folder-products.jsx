import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectedProductsCard from "@/app/dossierclient/_components/selected-products-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import SelectOrders from "./select-orders";
import SelectedOrdersCard from "./selected-orders-card";
export default function SelectFolderProducts({
  state,
  folder,
  selectedOrders,
  setSelectedOrders,
  selectedOrderId,
  setSelectedOrderId,
}) {
  return (
    <div className="container w-full  py-10">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Selection des produits pour la fiche production</CardTitle>
          <CardDescription>
            Sélectionnez les produits à ajouter à votre fiche de production .
            Vous pouvez ajouter plusieurs produits avant de valider votre fiche.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end ">
            <div className="w-full sm:w-3/4">
              <SelectOrders
                selectedOrderId={selectedOrderId}
                setSelectedOrderId={setSelectedOrderId}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                folder={folder}
              />
            </div>
          </div>

          {/* list of the selected products  */}

          <SelectedOrdersCard
            state={state}
            orders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            // handleRemoveProduct={handleRemoveProduct}
          />
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedOrders([])}
            disabled={selectedOrders.length === 0}
          >
            Supprimer tous
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
