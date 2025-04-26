"use client";
import React, { useActionState, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

// export default function SelectClient({ value, setValue }) {
export default function SelectEmploye({
  employes,
  isLoading,
  selectedEmployes,
  setSelectedEmployes,
  selectedEmployeId,
  setSelectedEmployeId,
  state,
}) {
  const [open, setOpen] = useState(false);
  // const { data: employes, isLoading, refresh } = useEmployes();

  useEffect(() => {
    console.log("employess : ", employes);
  }, [employes]);

  const selectedEmploye = employes.find(
    (employe) => employe.id_employe === selectedEmployeId
  );
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="w-full">
        <Input
          id="employe"
          name="employe"
          placeholder="employe"
          // value={selectedEmployes}
          readOnly
          //   defaultValue={state?.inputs?.name}
          type="text"
          hidden
        />
        <p className="p-1">Employee</p>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedEmploye
              ? `${selectedEmploye.nom_employe} ${selectedEmploye.prenom_employe}`
              : isLoading
              ? "Chargement..."
              : "Sélectionnez un employe..."}
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
                    Chargement des employes...
                    <Loader2 className="animate-spin ml-2 h-4 w-4" />
                  </CommandItem>
                </CommandGroup>
              ) : employes.length > 0 ? (
                <>
                  <CommandEmpty>employe introuvable.</CommandEmpty>
                  <CommandGroup>
                    {employes.map((employe) => (
                      <CommandItem
                        key={employe.id_employe}
                        value={employe.id_employe}
                        onSelect={() => {
                          setSelectedEmployeId(
                            employe.id_employe === selectedEmployeId
                              ? ""
                              : employe.id_employe
                          );
                          setOpen(false);
                        }}
                      >
                        {`${employe.nom_employe} ${employe.prenom_employe}`}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedEmployeId === employe.id_employe
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
                  <CommandItem disabled>Aucun employe trouvé</CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* {state?.errors?.employe && (
        <p className="text-sm text-red-500 px-2">{state.errors.employe[0]}</p>
      )} */}
    </div>
  );
}
