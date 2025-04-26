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
import { toast } from "sonner";
import { Loader2, Check, ChevronsUpDown, PlusCircle } from "lucide-react";
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
import { useEmployes, useMaterials } from "@/hooks/fetsh-data";

// export default function SelectClient({ value, setValue }) {
export default function SelectMaterial({
  selectedMaterials,
  setSelectedMaterials,
  selectedMaterialId,
  setSelectedMaterialId,
  materials,
  isLoading,
}) {
  const [open, setOpen] = useState(false);

  //   if (!selectedMaterialId) {
  //     toast.error("Aucune matière sélectionnée");
  //     return;
  //   }
  //   const selectedMaterial = selectedMaterialId
  //     ? materials?.find((m) => m.id_matiere === selectedMaterialId)
  //     : null;
  //   const materialToAdd = materials.find(
  //     (m) => m.id_matiere === selectedMaterialId
  //   );

  //   if (!materialToAdd) {
  //     toast.error("Matière introuvable");
  //     return;
  //   }

  //   const isDuplicate = selectedMaterials.some(
  //     (mat) => mat.id_matiere === selectedMaterialId
  //   );

  //   if (isDuplicate) {
  //     toast.warning(
  //       `${materialToAdd.designation_matiere} est déjà dans la liste`
  //     );
  //     return;
  //   }

  //   const newMaterial = {
  //     ...materialToAdd,
  //     id_matiare: materialToAdd.id_matiere,
  //     quantity: Number(quantity) || 1,
  //   };

  //   setSelectedMaterials([...selectedMaterials, newMaterial]);
  //   toast.success(`${materialToAdd.designation_matiere} ajouté`);

  //   // Reset selection
  //   setSelectedMaterialId(null);
  //   setQuantity(1);
  // };
  const selectedMaterial = materials.find(
    (material) => material.id_matiere === selectedMaterialId
  );
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="w-full">
        <Input
          id="material"
          name="material"
          placeholder="material"
          // value={value}
          readOnly
          //   defaultValue={state?.inputs?.name}
          type="text"
          hidden
        />
        <p className="p-1">Matiares premieres</p>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedMaterial
              ? `${selectedMaterial.designation_matiere}`
              : isLoading
              ? "Chargement..."
              : "Sélectionnez la matiere premiere..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-1">
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
                    {materials.map((material, index) => (
                      <CommandItem
                        key={material.id_matiere}
                        value={material.id_matiere}
                        onSelect={() => {
                          setSelectedMaterialId(
                            material.id_matiere === selectedMaterialId
                              ? ""
                              : material.id_matiere
                          );
                          setOpen(false);
                        }}
                      >
                        {`${material.designation_matiere}`}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedMaterialId === material.id_matiere
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ) : (
                <>
                  <CommandGroup>
                    <CommandItem disabled>Aucune matiare trouvé</CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* {state?.errors?.materials && (
        <p className="text-sm text-red-500 px-2">{state.errors.materials[0]}</p>
      )} */}
    </div>
  );
}



