
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
import { Loader2, Check, ChevronsUpDown, Plus } from "lucide-react";

import CreateClientFolderAction from "@/actions/create-clientFolder";
import SelectClient from "../_components/select-client";
import ProductCard from "../_components/product-card";
import SelectDepartment from "../_components/select-department";
import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateFolder() {
  const queryClient = useQueryClient();

  const [state, formAction, isPending] = useActionState(
    CreateClientFolderAction,
    null
  );
  const [department, setDepartment] = useState("");
  const [client, setClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (state?.success === true) {
      setSelectedProducts([]);
      setClient("");
      setDepartment("");
      toast.success(state?.message);
      queryClient.invalidateQueries(["folders"]);
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div className=" w-full flex items-center justify-center  5 m-2 rounded-xl">
    {/* <div className=""> */}
          <Card className="">

            <form action={formAction} className="space-y-4">
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Cree un dossier client</CardTitle>
                  <CardDescription>
                    Veuillez remplir le formulaire ci-dessous
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 flex flex-col gap-2">
                  <SelectClient
                    // clients={clients}
                    state={state}
                    value={client}
                    setValue={setClient}
                  />
                  <SelectDepartment
                    state={state}
                    setDepartment={setDepartment}
                    department={department}
                  />
                  <div className="flex flex-col ">
                    <Label htmlFor="name" className="p-1">
                      Numero bon commande
                    </Label>
                    <Input
                      id="bc"
                      name="bc"
                      placeholder="BC/Exemple/123"
                      defaultValue={state?.inputs?.bc}
                      type="text"
                      // className={
                      //   state?.errors?.bc
                      //     ? "border-red-500 focus-visible:ring-red-500"
                      //     : ""
                      // }
                    />
                  </div>
                  {state?.errors?.bc && (
                    <p className="text-sm text-red-500">{state.errors.bc[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <ProductCard
                    state={state}
                    // availableProducts={availableProducts}
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
