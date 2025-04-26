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
import { toast } from "sonner";
import { usePVsByDossierIdWithReserve } from "@/hooks/fetsh-data";
import { formatDateTime } from "@/utils/formateDate";

export default function FolderPv({ folderId, pvDialogOpen, handleClosePvDialog }) {
  const {
    data: pvs,
    isLoading,
    error,
  } = usePVsByDossierIdWithReserve(folderId);

  return (
    <Dialog
      open={pvDialogOpen}
      onOpenChange={handleClosePvDialog}
      className="flex justify-center items-center"
    >
      <DialogContent className="p-0 border-none max-h-[80%] w-full ">
        <Card className="border-none">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-center text-foreground">
              PV avec Réservations
            </DialogTitle>
            <DialogDescription className="text-center">
              Liste des PV avec réservation associées à ce dossier
            </DialogDescription>
          </DialogHeader>

          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-destructive text-center p-4">
                Erreur: {error.message}
              </div>
            ) : !pvs || pvs.length === 0 ? (
              <div className="text-muted-foreground text-center p-4">
                Aucun PV trouvé pour ce dossier
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {pvs.map((pv) => (
                    <Card key={pv.id_pv} className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p>{formatDateTime(pv.created_at)}</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">État</p>
                          <Badge>{pv.etat_pv}</Badge>
                        </div>
                      </div>

                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          Réservation
                        </p>
                        <p className="text-base whitespace-pre-wrap bg-muted/50 p-3 rounded-md">
                          {pv.reserve || "Aucune réservation"}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
