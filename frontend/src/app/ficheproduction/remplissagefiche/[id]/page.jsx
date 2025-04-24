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
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SelectEmploye from "../_componenets/select-employe";
import SelectMaterial from "../_componenets/select-material";
import SelectedEmployes from "../_componenets/selected-employes";
import SelectedMaterials from "../_componenets/selected-materials";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Materials from "../_componenets/materials";
import Employes from "../_componenets/employes";

export default function FileUpdate({ }) {


    const params = useParams();
  const fileId = params.id;
  const { data: data, isPending, isError, refresh } = useFileById(fileId);

  // useEffect(() => {
  //   console.log("selected file : ",data)
  // }, [data])
  
  return (
    <div className="flex justify-center items-center p-5 w-full">
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle>Mise A jour fiche production </CardTitle>
          <CardDescription>
            Veuillez remplir le formulaire ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {isError && <span>{isError.error}</span>}

            {data && (
              <>
                <span>Num bon de commande : {data.num_bc}</span>
                <span>Departement : {data.nom_departement}</span>
                <span>Atelier : {data.nom_atelier}</span>
              </>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex  gap-5">
            <Employes/>
            <Materials/>
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
