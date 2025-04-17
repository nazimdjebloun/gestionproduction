"use client";
import React, { useActionState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CreateClientAction from "@/actions/create-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import ClientTable from "./client-table";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import CreateClient from "./_components/create-client";
import { useState } from "react";
import EditClient from "./_components/edit-client";

const ClientTable = dynamic(() => import("./_components/client-table"), { ssr: false });
export default function Client() {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
  // Handle opening edit dialog
  const handleEdit = (client) => {
    setSelectedClient(client);
    setEditDialogOpen(true);
  };

  // Handle closing edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    // <div className=" flex flex-col gap-5 items-center justify-center  5 m-2 rounded-xl">
    <div className="w-full h-dvh">
      <div className="flex justify-between w-full p-2">
        <h1 className="text-3xl">Clients</h1>
        <CreateClient />
      </div>
      <ClientTable  />

    </div>
  );
}






  // const queryClient = useQueryClient();

  // const [state, formAction, isPending] = useActionState(
  //   CreateClientAction,
  //   null
  // );
  // useEffect(() => {
  //   if (state?.success === true) {
  //     toast.success(state?.message);
  //     queryClient.refetchQueries({ queryKey: ["clients"], type: "active" });
  //   }
  //   if (state?.success === false) {
  //     toast.error(state?.message);
  //   }
  // }, [state]);





      // <Dialog className="">
      //   <DialogTrigger asChild>
      //     <Button variant="outline">Ajouter un client</Button>
      //   </DialogTrigger>
      //   <DialogContent className="p-0 border-0">
      //     {/* <Card className="w-[450px] h-fit"> */}
      //     <Card>
      //       <DialogHeader>
      //         <DialogTitle className="text-center">
      //           Ajouter un client
      //         </DialogTitle>
      //       </DialogHeader>

      //       <CardHeader>
      //         {/* <CardTitle>Ajouter un client</CardTitle> */}
      //         <CardDescription>
      //           Veuillez remplir le formulaire ci-dessous
      //         </CardDescription>
      //       </CardHeader>
      //       <CardContent>
      //         <form action={formAction} className="space-y-4">
      //           <div className="space-y-2">
      //             <Label htmlFor="name">Nom client</Label>
      //             <Input
      //               id="name"
      //               name="name"
      //               placeholder="ANEP"
      //               defaultValue={state?.inputs?.name}
      //               type="text"
      //               className={
      //                 state?.errors?.name
      //                   ? "border-red-500 focus-visible:ring-red-500"
      //                   : ""
      //                 // : "border-green-300 focus-visible:ring-green-300"
      //               }
      //             />
      //             {state?.errors?.name && (
      //               <p className="text-sm text-red-500">
      //                 {state.errors.name[0]}
      //               </p>
      //             )}
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="email">Email client</Label>
      //             <Input
      //               id="email"
      //               name="email"
      //               defaultValue={state?.inputs?.email}
      //               type="email"
      //               placeholder="client@example.com"
      //               className={
      //                 state?.errors?.email
      //                   ? "border-red-500 focus-visible:ring-red-500"
      //                   : ""
      //               }
      //             />
      //             {state?.errors?.email && (
      //               <p className="text-sm text-red-500">
      //                 {state.errors.email[0]}
      //               </p>
      //             )}
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="phone">Tel client</Label>
      //             <Input
      //               id="phone"
      //               name="phone"
      //               defaultValue={state?.inputs?.phone}
      //               type="text"
      //               placeholder="05 12 34 56 78"
      //               className={
      //                 state?.errors?.phone
      //                   ? "border-red-500 focus-visible:ring-red-500"
      //                   : ""
      //               }
      //             />
      //             {state?.errors?.phone && (
      //               <p className="text-sm text-red-500">
      //                 {state.errors.phone[0]}{" "}
      //               </p>
      //             )}
      //           </div>

      //           <div className="space-y-2">
      //             <Label htmlFor="address">Address client</Label>
      //             <Textarea
      //               id="address"
      //               name="address"
      //               defaultValue={state?.inputs?.address}
      //               type="text"
      //               placeholder="rue, quartier,commune, wilaya"
      //               rows={3}
      //               className={
      //                 state?.errors?.address
      //                   ? "border-red-500 focus-visible:ring-red-500"
      //                   : ""
      //               }
      //             />
      //             {state?.errors?.address && (
      //               <p className="text-sm text-red-500">
      //                 {state.errors.address[0]}
      //               </p>
      //             )}
      //           </div>
      //           <div className=" flex justify-end w-full gap-2 ">
      //             <Button variant="destructive" type="reset" className="">
      //               réinitialiser
      //             </Button>
      //             <Button type="submit" className="" disabled={isPending}>
      //               {isPending ? (
      //                 <>
      //                   <Loader2 size={16} className="animate-spin" />{" "}
      //                   <p>Ajouter</p>{" "}
      //                 </>
      //               ) : (
      //                 "Ajouter"
      //               )}
      //             </Button>
      //           </div>
      //           {state?.errors?._form && (
      //             <p className="text-sm text-red-500">{state.errors._form}</p>
      //           )}
      //         </form>
      //       </CardContent>
      //       <CardFooter></CardFooter>
      //     </Card>
      //   </DialogContent>
      // </Dialog>;