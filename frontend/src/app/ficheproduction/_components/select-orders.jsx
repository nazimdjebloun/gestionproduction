"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFolderProducts, useProducts } from "@/hooks/fetsh-data";
import { toast } from "sonner";

export default function SelectOrders({
  // selectedOrderId,
  // setSelectedOrderId,
  selectedOrders,
  setSelectedOrders,
  folder,
}) {
  const [open, setOpen] = useState(false);
  const { data: orders, isLoading, refresh } = useFolderProducts(folder);
  const [selectedOrderId, setSelectedOrderId] = useState("");




  useEffect(() => {
    console.log(selectedOrders);
  }, [selectedOrders]);

  const handleAddProduct = () => {
    if (!selectedOrderId) {
      toast.error("No product selected");
      return;
    }

    const orderToAdd = orders.find(
      (p) => p.id_detail_commande === selectedOrderId
    );

    if (!orderToAdd) return;

    const newOrder = {
      ...orderToAdd,
      // id_detail_commande: orderToAdd.id_detail_commande,
    };

    setSelectedOrders([...selectedOrders, newOrder]);
     setSelectedOrderId("");
    // setSelectedOrders([]);
    toast.success(`${orderToAdd.id_detail_commande} ajouter `);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <span>Produits du dossiers</span>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between mt-1"
          >
            {orders && selectedOrderId
              ? orders.find(
                  (order) => order.id_detail_commande === selectedOrderId
                )?.id_detail_commande
              : "Rechrcher une commande..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Recherche..." />
            <CommandList>
              {/* <CommandEmpty>Aucun produit trouve.</CommandEmpty> */}
              {!orders || orders.length === 0 ? (
                // <div className="px-4 py-2 text-sm text-muted-foreground">
                //   0 produits.
                // </div>
                <CommandEmpty>Aucun produit trouve.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {orders.map((order) => (
                    <CommandItem
                      key={order.id_detail_commande}
                      value={order.id_detail_commande}
                      onSelect={() => {
                        setSelectedOrderId(
                          order.id_detail_commande === selectedOrderId
                            ? ""
                            : order.id_detail_commande
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedOrderId === order.id_detail_commande
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span>{order.id_detail_commande}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        onClick={handleAddProduct}
        className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
      >
        <PlusCircle className=" h-4 w-4" />
        <span className=" font-bold">Ajouter</span>
      </Button>
    </div>
  );
};

                {
                  /* {orders.map((order) => {
                  return (
                  <CommandItem
                    key={order.id_detail_commande}
                    value={order.id_detail_commande}
                    onSelect={() => {
                      setSelectedProductId(
                        order.id_detail_commande === selectedProductId
                          ? ""
                          : order.id_detail_commande
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProductId === order.id_detail_commande
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span>{order.id_detail_commande}</span>
                  </CommandItem>
                )})} */
                }





            {
              /* <CommandGroup>
              {availableProducts.map((product) => (
                <CommandItem
                  key={`${product.id}-${index}`}
                  // key={product.id_produit}
                  value={product.designation_produit}
                  onSelect={() => {
                    setSelectedProductId(
                      product.id_produit === selectedProductId
                        ? ""
                        : product.id_produit
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProductId === product.id_produit
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span>{product.designation_produit}</span>
                </CommandItem>
              ))}
            </CommandGroup> */
            }