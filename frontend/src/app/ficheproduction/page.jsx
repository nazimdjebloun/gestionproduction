"use client";
import React, { useActionState, useState } from "react";
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
import ProductCard from "../dossierclient/_components/product-card";
import SelectClient from "../dossierclient/_components/select-client";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import SelectProducts from "../dossierclient/_components/select-products";
import { useFolderProducts, useProducts } from "@/hooks/fetsh-data";
import SelectShop from "./_components/select-shop";
import { toast } from "sonner";
import SelectFolder from "./_components/select-fodler";
import SelectFolderProducts from "./_components/select-folder-products";
export default function FicheProduction() {
  const [state, formAction, isPending] = useActionState(
    CreateProductionFileAction,
    null
  );

  const [department, setDepartment] = useState("");
  const [shop, setShop] = useState("");
  const [folder, setFolder] = useState("");

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
            <div className="flex justify-between">
              <SelectDepartment
                state={state}
                setDepartment={setDepartment}
                department={department}
              />
              <SelectShop state={state} setShop={setShop} shop={shop} />
              <SelectFolder
                state={state}
                setFolder={setFolder}
                folder={folder}
              />
            </div>

            <div>
              <SelectFolderProducts state={state} />
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
