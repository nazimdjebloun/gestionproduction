"use client";
import React, { useActionState } from "react";
import { useState, useEffect } from "react";
import {
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

import SelectProducts from "./select-products";
import SelectedProductsCard from "./selected-products-card";
import ProductQuantity from "./product-quantity";
import ProductSurface from "./product-surface";
import CreateClientFolderAction from "@/actions/create-clientFolder";

export default function ProductCard({
  availableProducts,
  selectedProducts,
  setSelectedProducts,
  state,
}) {
  const [quantity, setQuantity] = useState(1);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [hasSurface, setHasSurface] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  //   const [selectedProducts, setSelectedProducts] = useState([]);
  // useEffect(() => {
  //   console.log("selectedProducts:", selectedProducts);
  // }, [selectedProducts]);
  const handleHasSurfaceChange = () => {
    if (hasSurface) {
      setWidth(0);
      setHeight(0);
      setHasSurface(false);
    } else {
      setHasSurface(true);
    }
  };

  const handleAddProduct = () => {
    if (!selectedProductId) {
      toast.error("No product selected");
      return;
    }

    const productToAdd = availableProducts.find(
      (p) => p.id === selectedProductId
    );

    if (!productToAdd) return;

    const uniqueId = `${selectedProductId}-${Date.now()}`;
    const newProduct = {
      ...productToAdd,
      uniqueId,
      quantity,
      productDetails,
      // surface: { width, height },
      ...(hasSurface ? { surface: { width, height } } : {}),
    };

    setSelectedProducts([...selectedProducts, newProduct]);
    setSelectedProductId("");
    setQuantity(1);
    setProductDetails("");
    if (hasSurface) {
      setWidth(0);
      setHeight(0);
      setHasSurface(false);
    }

    toast.success(`${productToAdd.name} added`);
  };

  const handleRemoveProduct = (uniqueId) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.uniqueId !== uniqueId)
    );
    toast("Product removed");
  };

  return (
    <div className="container w-full  py-10">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Selection des produits</CardTitle>
          <CardDescription>
            Sélectionnez les produits à ajouter à votre dossier clients. Vous
            pouvez ajouter plusieurs produits avant de valider votre commande.
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
            <ProductQuantity
              quantity={quantity}
              setQuantity={setQuantity}
              state={state}
            />
            <Button
              type="button"
              onClick={handleAddProduct}
              className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
            >
              <PlusCircle className=" h-4 w-4" />
              <span className=" font-bold">Ajouter</span>
            </Button>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            {/* input product details  */}
            <div className="w-full">
              <Label htmlFor="details">Détails</Label>
              <Textarea
                id="details"
                name="details"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                type="text"
                placeholder="Détails supplémentaires sur le produit sélectionné"
                rows={3}
                className="mt-1"
              />
            </div>

            {/* input product surface  */}
            <ProductSurface
              height={height}
              setHeight={setHeight}
              width={width}
              setWidth={setWidth}
              hasSurface={hasSurface}
              handleHasSurfaceChange={handleHasSurfaceChange}
            />
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
