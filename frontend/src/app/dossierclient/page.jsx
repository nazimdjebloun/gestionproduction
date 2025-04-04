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
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";

import CreateClientFolderAction from "@/actions/create-clientFolder";
import SelectClient from "./_components/select-client";
import ProductCard from "./_components/product-card";
import SelectDepartment from "./_components/select-department";

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

const departments = [
  {
    id: "department001",
    name: "department 1",
  },
  {
    id: "department002",
    name: "department 2",
  },
  {
    id: "department003",
    name: "department 3",
  },
  {
    id: "department004",
    name: "department 4",
  },
];

const availableProducts = [
  {
    id: "1",
    name: "Laptop",
  },
  {
    id: "2",
    name: "Smartphone",
  },
  {
    id: "3",
    name: "Headphones",
  },
  {
    id: "4",
    name: "Monitor",
  },
  {
    id: "5",
    name: "Keyboard",
  },
  {
    id: "6",
    name: "Mouse",
  },
  {
    id: "7",
    name: "Tablet",
  },
  {
    id: "8",
    name: "Webcam",
  },
];

export default function DossierClient() {
  const [state, formAction, isPending] = useActionState(
    CreateClientFolderAction,
    null
  );
  const [client, setClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [department, setDepartment] = useState("");

  // useEffect(() => {
  //   console.log(JSON.stringify(selectedProducts));
  // }, [selectedProducts]);

  useEffect(() => {
    if (departments.length > 0 && !department) {
      setDepartment(departments[0].id);
    }
  }, [departments]);

  useEffect(() => {
    if (state?.success === true) {
      setSelectedProducts([]);
      setClient("");
      setDepartment("");
      toast.success(state?.message);
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div className=" w-full flex items-center justify-center  5 m-2 rounded-xl">
      <Card className="w-[800px] h-fit">
        <form action={formAction} className="space-y-4">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Cree un dossier client</CardTitle>
              <CardDescription>
                Veuillez remplir le formulaire ci-dessous
              </CardDescription>
            </div>
            <SelectDepartment
              state={state}
              setDepartment={setDepartment}
              department={department}
              departmentValues={departments}
            />
          </CardHeader>
          <CardContent>
            <div className="">
              {/* <Popover open={open} onOpenChange={setOpen} className="w-[100%]">
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
                      <CommandEmpty>Client introuvable</CommandEmpty>
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
                            {client.label}
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
              </Popover> */}
              <SelectClient
                clients={clients}
                value={client}
                setValue={setClient}
              />
              {state?.errors?.client && (
                <p className="text-sm text-red-500 px-2">
                  {state.errors.client[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <ProductCard
                state={state}
                availableProducts={availableProducts}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
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
