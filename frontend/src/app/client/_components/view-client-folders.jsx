import React, { useEffect } from "react";
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
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useFileByFolderId, useFolderByClientId } from "@/hooks/fetsh-data";

export default function ClientFolders({
  client,
  viewFoldersDialogOpen,
  handleCloseViewFoldersDialog,
}) {
  const queryClient = useQueryClient();
  const {
    data: dossiers,
    isLoading,
      error,
    refresh
  } = useFolderByClientId(client.id_client);

//   useEffect(() => {
//       console.log(dossiers);
//   }, [dossiers]);

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Dialog
      open={viewFoldersDialogOpen}
      onOpenChange={handleCloseViewFoldersDialog}
      className="flex justify-center items-center"
    >
      <DialogContent className="p-0 border-none max-h-[80%] w-full">
        <Card className="border-none">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-center text-foreground">
              Dossiers du client
            </DialogTitle>
            <DialogDescription className="text-center">
              Liste complète des dossiers associés à ce client
            </DialogDescription>
          </DialogHeader>

          <CardContent className="p-4 space-y-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-destructive text-center p-4">
                Erreur lors du chargement: {error.message}
              </div>
            ) : !dossiers?.length ? (
              <div className="text-muted-foreground text-center p-4">
                Aucun dossier trouvé pour ce client
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {dossiers.map((dossier) => (
                    <div
                      key={dossier.id_dossier}
                      className="p-3 rounded-lg border border-border bg-card"
                    >
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Numéro BC:</p>
                          <p className="text-foreground">{dossier.num_bc}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Département:</p>
                          <p className="text-foreground">
                            {dossier.nom_departement}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Date création:
                          </p>
                          <p className="text-foreground">
                            {format(
                              new Date(dossier.date_creation),
                              "dd/MM/yyyy"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">ID Dossier:</p>
                          <p className="text-foreground font-mono text-xs">
                            {dossier.id_dossier}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">État:</p>
                        <Badge
                          variant={
                            dossier.etat_dossier === "finie"
                              ? "default"
                              : dossier.etat_dossier === "entraitement"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {dossier.etat_dossier}
                        </Badge>
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                        <span>
                          Créé:{" "}
                          {format(new Date(dossier.created_at), "dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t border-border justify-center">
            <Button
              variant="outline"
              onClick={handleCloseViewFoldersDialog}
              className="w-full max-w-xs"
            >
              Fermer
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// useEffect(() => {
//   return () => {
//     // Restore interactivity when component unmounts
//     document.body.style.pointerEvents = "auto";
//     document.body.style.overflow = "auto";
//   };
// }, []);
