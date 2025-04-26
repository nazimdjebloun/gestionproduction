"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFileById, useFiles } from "@/hooks/fetsh-data";
import { Separator } from "@/components/ui/separator";
import React, { useActionState, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import Materials from "../_componenets/materials";
import Employes from "../_componenets/employes";
import ProductionFileFillngAction from "@/actions/ficheproduction/productionfile-fillng";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function FileUpdate({}) {
  const queryClient = useQueryClient();
  const [state, formAction, isLoading] = useActionState(
    ProductionFileFillngAction,
    null
  );
  useEffect(() => {
    if (state?.success === true) {
      queryClient.invalidateQueries({
        queryKey: ["productionfiles"], // Must match exactly
        refetchType: "active", // Optional
      });
      queryClient.invalidateQueries({
        queryKey: ["employesByproductionfile"], // Must match exactly
        refetchType: "active", // Optional
      });
      queryClient.invalidateQueries({
        queryKey: ["materialByproductionfile"], // Must match exactly
        refetchType: "active", // Optional
      });
    }
  }, [state]);

  const params = useParams();
  const fileId = params.id;
  const { data: data, isPending, isError, refresh } = useFileById(fileId);

  // useEffect(() => {
  //   console.log("selected file : ", data);
  // }, [data]);

  return (
    <div className="flex justify-center items-center p-5 w-full">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Mise A jour fiche production </CardTitle>
          <CardDescription>
            Veuillez remplir le formulaire ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full ">
          <div className="">
            {isError && <span>{isError.error}</span>}
            {data && (
              <>
                <form
                  action={formAction}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex flex-col">
                    <span>Num bon de commande : {data.num_bc}</span>
                    <span>Departement : {data.nom_departement}</span>
                    <span>Client : {data.nom_client}</span>
                    <span>dossier : {data.id_dossier}</span>
                    <span>Atelier : {data.nom_atelier}</span>
                    <input
                      id="folder"
                      type="hidden"
                      name="folder"
                      value={data.id_dossier}
                    />
                  </div>
                  <Separator className="my-4" />
                  <input type="hidden" name="fileId" value={fileId} />
                  <div className="flex flex-col gap-5 w-full ">
                    <Employes state={state} />
                    <Materials state={state} />
                  </div>

                  <div className=" flex justify-end w-full gap-2 ">
                    <Button variant="destructive" type="reset" className="">
                      réinitialiser
                    </Button>
                    <Button type="submit" className="" disabled={isLoading}>
                      {isLoading ? (
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
              </>
            )}
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
