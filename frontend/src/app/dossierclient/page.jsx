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
import SelectProducts from "./_components/select-products";

const clients = [
  {
    value: "client1",
    label: "client 1",
  },
  {
    value: "client12",
    label: "client 12",
  },
  {
    value: "client13",
    label: "client 13",
  },
  {
    value: "client14",
    label: "client 14",
  },
  {
    value: "client15",
    label: "client 15",
  },
];
 

export default function DossierClient() {
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState("");
  const [state, formAction, isPending] = useActionState(
    CreateClientFolderAction,
    null
  );
  useEffect(() => {
    if (state?.success === true) {
      toast.success(state?.message);
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div className=" w-full flex items-center justify-center  5 m-2 rounded-xl">
      <Card className="w-[800px] h-fit">
        <CardHeader>
          <CardTitle>Cree un dossier client</CardTitle>
          <CardDescription>
            Veuillez remplir le formulaire ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Popover open={open} onOpenChange={setOpen} className="w-[100%]">
                <Label htmlFor="client">Client</Label>
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
                <PopoverTrigger asChild className="w-[100%]">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[100%] justify-between"
                  >
                    {value
                      ? clients.find((client) => client.value === value)?.label
                      : "Selectionnez un client..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[100%] p-1">
                  <Command>
                    <CommandInput
                      placeholder="Recherche un client..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>client introuvable</CommandEmpty>
                      <CommandGroup>
                        {clients.map((client) => (
                          <CommandItem
                            key={client.value}
                            value={client.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {client.label} +
                            <Check
                              className={cn(
                                "ml-auto",
                                value === client.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <SelectProducts />
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
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
