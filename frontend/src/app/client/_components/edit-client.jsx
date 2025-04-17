"use client";
import React, { useActionState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,

} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit2, Loader2, X } from "lucide-react";
// import ClientTable from "./client-table";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import EditClientAction from "@/actions/client/EditClientAction";
export default function EditClient({ client, editDialogOpen,Close}) {
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(
    EditClientAction,
    client
  );
  // useEffect(() => {
  //   return () => {
  //     // Restore interactivity when component unmounts
  //     document.body.style.pointerEvents = "auto";
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state?.message);
      queryClient.refetchQueries({ queryKey: ["clients"], type: "active" });
      Close();
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div className="w-full h-full">
      <Dialog open={editDialogOpen} onOpenChange={Close}>
        {/* <DialogTrigger className="flex items-end gap-2">
          <Edit2 />
          Modifier client
        </DialogTrigger> */}
        <DialogContent className="p-0 border-0 "
        
        >
          <Card>
            <DialogHeader>
              <DialogTitle className="text-center">
                Modifier un client
              </DialogTitle>
            </DialogHeader>

            <CardHeader>
              <CardDescription>
                Veuillez remplir le formulaire ci-dessous
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <Input
                  defaultValue={client.id_client}
                  id="id"
                  name="id"
                  type="text"
                  hidden
                />
                <div className="space-y-2">
                  <Label htmlFor="name">Nom client</Label>
                  <Input
                    defaultValue={client.nom_client}
                    id="name"
                    name="name"
                    placeholder="ANEP"
                    type="text"
                    className={
                      state?.errors?.name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {state?.errors?.name && (
                    <p className="text-sm text-red-500">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email client</Label>
                  <Input
                    id="email"
                    defaultValue={client.email_client}
                    name="email"
                    type="email"
                    placeholder="client@example.com"
                    className={
                      state?.errors?.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {state?.errors?.email && (
                    <p className="text-sm text-red-500">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Tel client</Label>
                  <Input
                    id="phone"
                    defaultValue={client.tel_client}
                    name="phone"
                    type="text"
                    placeholder="05 12 34 56 78"
                    className={
                      state?.errors?.phone
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {state?.errors?.phone && (
                    <p className="text-sm text-red-500">
                      {state.errors.phone[0]}{" "}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address client</Label>
                  <Textarea
                    defaultValue={client.adresse_client}
                    id="address"
                    name="address"
                    type="text"
                    placeholder="rue, quartier,commune, wilaya"
                    rows={3}
                    className={
                      state?.errors?.address
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {state?.errors?.address && (
                    <p className="text-sm text-red-500">
                      {state.errors.address[0]}
                    </p>
                  )}
                </div>
                <div className=" flex justify-end w-full gap-2 ">
                  <Button variant="destructive" type="reset" className="">
                    réinitialiser
                  </Button>
                  <Button type="submit" className="" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        <p>Valider</p>{" "}
                      </>
                    ) : (
                      "Valider"
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
