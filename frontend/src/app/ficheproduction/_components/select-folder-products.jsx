import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProducts } from '@/hooks/fetsh-data';
import SelectedProductsCard from '@/app/dossierclient/_components/selected-products-card';
import SelectProducts from '@/app/dossierclient/_components/select-products';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
export default function SelectFolderProducts({state}) {
      const { data: availableProducts, isLoading, refresh } = useProducts();
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
    <div className="container w-full  py-10">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Selection des produits pour la fiche production</CardTitle>
          <CardDescription>
            Sélectionnez les produits à ajouter à votre fiche de production . Vous
            pouvez ajouter plusieurs produits avant de valider votre fiche.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end ">
            <div className="w-full sm:w-3/4">
              <SelectProducts
                availableProducts={availableProducts}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
              />
            </div>
            <Button
              type="button"
              onClick={handleAddProduct}
              className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
            >
              <PlusCircle className=" h-4 w-4" />
              <span className=" font-bold">Ajouter</span>
            </Button>
          </div>

          {/* list of the selected products  */}
          <SelectedProductsCard
            state={state}
            selectedProducts={selectedProducts}
            handleRemoveProduct={handleRemoveProduct}
          />
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedProducts([])}
            disabled={selectedProducts.length === 0}
          >
            Supprimer tous
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
