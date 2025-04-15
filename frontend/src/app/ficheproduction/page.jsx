"use client";
import React, { useActionState, useState, useEffect } from "react";
import SelectDepartment from "../dossierclient/_components/select-department";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateProductionFileAction from "@/actions/create-productionFile";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";

import SelectShop from "./_components/select-shop";
import { toast } from "sonner";
import SelectFolder from "./_components/select-folder";
import SelectFolderProducts from "./_components/select-folder-products";
import { useDepartmentByFolderId } from "@/hooks/fetsh-data";
export default function FicheProduction() {
  const [state, formAction, isPending] = useActionState(
    CreateProductionFileAction,
    null
  );
  const [shop, setShop] = useState("");
  const [folder, setFolder] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    if (state?.success === true) {
      setSelectedOrders([]);
      setFolder("");
      setDepartment("");
      setShop("");
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
              <CardTitle>Cree une fiche de production </CardTitle>
              <CardDescription>
                Veuillez remplir le formulaire ci-dessous
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col ">
              <SelectFolder
                state={state}
                setFolder={setFolder}
                setShop={setShop}
                folder={folder}
                setDepartment={setDepartment}
                department={department}
                setSelectedOrderId={setSelectedOrderId}
                setSelectedOrders={setSelectedOrders}
              />
              <SelectShop
                state={state}
                setShop={setShop}
                shop={shop}
                department={department}
              />
            </div>
            <div>
              <SelectFolderProducts
                state={state}
                folder={folder}
                selectedOrderId={selectedOrderId}
                setSelectedOrderId={setSelectedOrderId}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
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
