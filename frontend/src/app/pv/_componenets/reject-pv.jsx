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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RejectPvAction from "@/actions/pv/rejecte-pv-action";
import { useQueryClient } from "@tanstack/react-query";



export default function RejectPv({
  selectedPv,
  rejectDialogOpen,
  handleClosePvRejectDialog,
}) {
    const [state, formAction, isPending] = useActionState(RejectPvAction, null);
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

      handleClosePvRejectDialog();
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <Dialog open={rejectDialogOpen} onOpenChange={handleClosePvRejectDialog}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none">
        <form action={formAction}>
          <input type="hidden" name="pvId" value={selectedPv} />
          <Card className="border-none">
            <DialogHeader>
              <DialogTitle className="text-center">Rejeter le PV</DialogTitle>
              <DialogDescription className="text-center">
                Veuillez indiquer la raison du rejet
              </DialogDescription>
            </DialogHeader>

            <CardContent className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reserve">Motif du rejet</Label>
                <Textarea
                  id="reserve"
                  name="reserve"
                  placeholder="Entrez la raison du rejet..."
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Cette action marquera le PV comme rejeté et enregistrera votre
                commentaire.
              </p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleClosePvRejectDialog}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    En cours...
                  </>
                ) : (
                  "Confirmer le rejet"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}