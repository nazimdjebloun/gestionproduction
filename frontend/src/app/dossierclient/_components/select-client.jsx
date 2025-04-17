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
import { useClients } from "@/hooks/fetsh-data";

// export default function SelectClient({ value, setValue }) {
export default function SelectClient({ value, setValue, state }) {
  const [open, setOpen] = useState(false);
  const { data: clients, isLoading, refresh } = useClients();
  const selectedClient = clients.find((client) => client.id_client === value);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="w-[100%]">
        <Input
          id="client"
          name="client"
          placeholder="client"
          value={value}
          readOnly
          //   defaultValue={state?.inputs?.name}
          type="text"
          hidden
        />
        <p className="p-1">Clients</p>
        <PopoverTrigger asChild className="w-[100%]">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100%] justify-between"
          >
            {selectedClient
              ? selectedClient.nom_client
              : isLoading
              ? "Chargement..."
              : "Sélectionnez un client..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100%] p-1">
          {/* <Command className="w-full">
            {isLoading ? (
              <CommandGroup>
                <CommandItem>
                  Chargement des clients <Loader2 className="animate-spin" />
                </CommandItem>
              </CommandGroup>
            ) : clients.length > 0 ? (
              <>
                <CommandInput
                  placeholder="Recherche un client..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>Client introuvable</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => (
                      <CommandItem
                        key={client.id_client}
                        value={client.nom_client}
                        // onSelect={(currentValue) => {
                        //   setValue(currentValue === value ? "" : currentValue);
                        //   setOpen(false);
                        // }}
                        onSelect={() => {
                          setValue(client.id_client); // update by ID
                          setOpen(false);
                        }}
                      >
                        {client.nom_client}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === client.id_client
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </>
            ) : (
              <CommandGroup>
                <CommandItem>Pas de clients</CommandItem>
              </CommandGroup>
            )}
          </Command> */}
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
                    Chargement des clients...
                    <Loader2 className="animate-spin ml-2 h-4 w-4" />
                  </CommandItem>
                </CommandGroup>
              ) : clients.length > 0 ? (
                <>
                  <CommandEmpty>Client introuvable.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => (
                      <CommandItem
                        key={client.id_client}
                        value={client.nom_client}
                        onSelect={() => {
                          setValue(client.id_client);
                          setOpen(false);
                        }}
                      >
                        {client.nom_client}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === client.id_client
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
                  <CommandItem disabled>Aucun client trouvé</CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {state?.errors?.client && (
        <p className="text-sm text-red-500 px-2">{state.errors.client[0]}</p>
      )}
    </div>
  );
}
