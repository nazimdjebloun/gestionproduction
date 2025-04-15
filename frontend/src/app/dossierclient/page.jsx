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
import axiosInstance from "@/lib/axios";

export default function DossierClient() {
  const [state, formAction, isPending] = useActionState(
    CreateClientFolderAction,
    null
  );
  const [department, setDepartment] = useState("");
  const [client, setClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (departments.length > 0 && !department) {
  //     setDepartment(departments[0].id);
  //   }
  // }, [departments]);

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
            />
          </CardHeader>
          <CardContent>
            <div className="">
              <SelectClient
                // clients={clients}
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
