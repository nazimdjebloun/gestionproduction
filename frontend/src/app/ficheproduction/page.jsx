"use client";
import React, { useActionState, useState } from "react";
import SelectDepartment from "../dossierclient/_components/select-department";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateProductionFileAction from "@/actions/create-productionFile";
import ProductCard from "../dossierclient/_components/product-card";
import SelectClient from "../dossierclient/_components/select-client";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import SelectProducts from "../dossierclient/_components/select-products";
import { useFolderProducts, useProducts } from "@/hooks/fetsh-data";
import SelectedProductsCard from "../dossierclient/_components/selected-products-card";
import SelectShop from "./_components/select-shop";
import { toast } from "sonner";
export default function FicheProduction() {
  const [state, formAction, isPending] = useActionState(
    CreateProductionFileAction,
    null
  );
    // const { data: FolderProducts, isLoading, refresh } = useFolderProducts();
    const { data: availableProducts, isLoading, refresh } = useProducts();
  
  const [department, setDepartment] = useState("");
  const [shop, setShop] = useState("");

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");

    const handleRemoveProduct = (id_produit) => {
      setSelectedProducts(
        selectedProducts.filter((p) => p.id_produit !== id_produit)
      );
      toast("Product removed");
  };
  
    const handleAddProduct = () => {
      if (!selectedProductId) {
        toast.error("No product selected");
        return;
      }

      const productToAdd = availableProducts.find(
        (p) => p.id_produit === selectedProductId
      );

      if (!productToAdd) return;

      // const uniqueId = `${selectedProductId}-${Date.now()}`;
      const newProduct = {
        ...productToAdd,
        id_produit: productToAdd.id_produit,

      };

      setSelectedProducts([...selectedProducts, newProduct]);
      setSelectedProductId("");
 
      toast.success(`${productToAdd.designation_produit} ajouter `);
    };

  return (
    <div className=" w-full flex items-center justify-center  5 m-2 rounded-xl">
      <Card className="w-[800px] h-fit">
        <form action={formAction} className="space-y-4">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Cree une fiche de production </CardTitle>
              <CardDescription>
                Veuillez remplir le formulaire ci-dessous
              </CardDescription>
            </div>
            <SelectDepartment
              state={state}
              setDepartment={setDepartment}
              department={department}
            />
            <SelectShop state={state} setShop={setShop} shop={shop} />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <SelectProducts
                availableProducts={availableProducts}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
              />
              <Button
                type="button"
                onClick={handleAddProduct}
                className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
              >
                <PlusCircle className=" h-4 w-4" />
                <span className=" font-bold">Ajouter</span>
              </Button>
              <SelectedProductsCard
                state={state}
                selectedProducts={selectedProducts}
                handleRemoveProduct={handleRemoveProduct}
              />
            </div>

            <div className=" flex justify-end w-full gap-2 ">
              <Button variant="destructive" type="reset" className="">
                réinitialiser
              </Button>
              <Button type="submit" className="" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />{" "}
                    <p>Ajouter</p>{" "}
                  </>
                ) : (
                  "Ajouter"
                )}
              </Button>
            </div>
            {state?.errors?._form && (
              <p className="text-sm text-red-500">{state.errors._form}</p>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </form>
      </Card>
    </div>
  );
}
