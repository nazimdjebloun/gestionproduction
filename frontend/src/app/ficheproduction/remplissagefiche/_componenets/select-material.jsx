"use client";
import React, { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateClientAction from "@/actions/create-client";
import { toast } from "sonner";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";
import CreateClientFolderAction from "@/actions/create-clientFolder";
import { useEmployes, useMaterials } from "@/hooks/fetsh-data";

// export default function SelectClient({ value, setValue }) {
export default function SelectMaterial({ value, setValue, state }) {
  const [open, setOpen] = useState(false);
  const { data: materials, isLoading, refresh } = useMaterials();

    
  const handleAddMaterial = () => {
    if (!selectedMaterials) {
      toast.error("No selected Materials ");
      return;
    }

    const materialToAdd = materials.find(
      (p) => p.id_produit === selectedProductId
    );

    if (!productToAdd) return;

    // const uniqueId = `${selectedProductId}-${Date.now()}`;
    const newProduct = {
      ...productToAdd,
      id_produit: productToAdd.id_produit,
      quantity,
      ...(productDetails ? { productDetails } : { productDetails: null }),
      ...(hasSurface ? { width, height } : { width: null, height: null }),
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

    toast.success(`${productToAdd.designation_produit} ajouter `);
  };

    
  useEffect(() => {
    console.log("materials : ", materials);
  }, [materials]);

  const selectedMaterial = materials.find(
    (material) => material.id_matiare === value
  );
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="w-[100%]">
        <Input
          id="material"
          name="material"
          placeholder="material"
          value={value}
          readOnly
          //   defaultValue={state?.inputs?.name}
          type="text"
          hidden
        />
        <p className="p-1">Matiares premieres</p>
        <PopoverTrigger asChild className="w-[100%]">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100%] justify-between"
          >
            {selectedMaterial
              ? `${selectedMaterial.designation_matiere}`
              : isLoading
              ? "Chargement..."
              : "Sélectionnez la matiere premiere..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100%] p-1">
          <Command>
            <CommandInput
              placeholder="Rechercher un client..."
              className="h-9"
              disabled={isLoading}
            />
            <CommandList>
              {isLoading ? (
                <CommandGroup>
                  <CommandItem disabled>
                    Chargement des matiares ...
                    <Loader2 className="animate-spin ml-2 h-4 w-4" />
                  </CommandItem>
                </CommandGroup>
              ) : materials.length > 0 ? (
                <>
                  <CommandEmpty>matiare introuvable.</CommandEmpty>
                  <CommandGroup>
                    {materials.map((material) => (
                      <CommandItem
                        key={material.id_matiare}
                        value={material.id_matiare}
                        onSelect={() => {
                          setValue(material.id_matiare);
                          setOpen(false);
                        }}
                      >
                        {`${material.designation_matiere}`}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === material.id_matiare
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ) : (
                <CommandGroup>
                  <CommandItem disabled>Aucune matiare trouvé</CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {state?.errors?.materials && (
        <p className="text-sm text-red-500 px-2">{state.errors.materials[0]}</p>
      )}
    </div>
  );
}
