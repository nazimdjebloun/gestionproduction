"use client"
import React, { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useFileByFolderId } from "@/hooks/fetsh-data";
import { formatCaption } from "react-day-picker";
import { toast } from "sonner";
import ValidatePvAction from "@/actions/pv/validate-pv-action";
import { useQueryClient } from "@tanstack/react-query";

// const ValidatePvAction = () => {
//   console.log("test")
//     console.log("test");

// }

export default function ValidatePv({
  selectedPv,
  validateDialogOpen,
  handleClosePvValidatDialog,
}) {
  const [state, formAction, isPending] = useActionState(ValidatePvAction, null);
    const queryClient = useQueryClient();

  // useEffect(() => {
  //   console.log("selectedPv", selectedPv);
  // }, [selectedPv]);

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state?.message);
            queryClient.refetchQueries({
              queryKey: ["pvs"],
              type: "active",
            });
                  queryClient.refetchQueries({
                    queryKey: ["pvsvalider"],
                    type: "active",
                  });
                  queryClient.refetchQueries({
                    queryKey: ["clientfolders"],
                    type: "active",
                  });
                  queryClient.invalidateQueries(["folders"]);
      handleClosePvValidatDialog();
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <Dialog open={validateDialogOpen} onOpenChange={handleClosePvValidatDialog}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none">
        <form action={formAction}>
          <input type="hidden" name="pvId" value={selectedPv} />
          <Card className="border-none">
            <DialogHeader>
              <DialogTitle className="text-center">Valider le PV</DialogTitle>
              <DialogDescription className="text-center">
                Confirmez-vous la validation de ce procès-verbal?
              </DialogDescription>
            </DialogHeader>

            <CardContent className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground text-center">
                Cette action marquera le PV comme validé et ne pourra plus être
                modifié.
              </p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleClosePvValidatDialog}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button type="submit" variant="default" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validation...
                  </>
                ) : (
                  "Confirmer la validation"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}