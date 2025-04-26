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
import {
  useFileByFolderId,
  usePVsEnTraitementByDossierId,
} from "@/hooks/fetsh-data";
import { formatCaption } from "react-day-picker";
import CreatePv from "@/actions/pv/create-pv-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function FolderFiles({
  folderId,
  viewDialogOpen,
  handleCloseViewDialog,
}) {
  const queryClient = useQueryClient();

  const [state, formAction, isPending] = useActionState(CreatePv, null);
  const { data: files, isLoading, error } = useFileByFolderId(folderId);

  const {
    data: PvEnTrait,
    PvEnTraitIsLoading,
    PvEnTraitError,
  } = usePVsEnTraitementByDossierId(folderId);

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state?.message);
      queryClient.invalidateQueries({
        queryKey: ["pvs"], // Must match exactly
        refetchType: "active", // Optional
      });
      queryClient.invalidateQueries({
        queryKey: ["pvsEnTraitementByDossier"], // Must match exactly
        refetchType: "active", // Optional
      });
      handleCloseViewDialog();
    }
    if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state]);

  // const handleCustomAction = () => {
  //   console.log("All fiches are complete - performing custom action");
  // };

  const allFinished = files?.every((fiche) => fiche.etat_fiche === "finie");
  const hasPvInTraitement = PvEnTrait?.some(
    (pv) => pv.etat_pv === "entraitement"
  );
  return (
    <Dialog
      open={viewDialogOpen}
      onOpenChange={handleCloseViewDialog}
      className="flex justify-center items-center"
    >
      <DialogContent className="p-0 border-none max-h-[80%] w-full ">
        <form action={formAction}>
          <Card className="border-none ">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-center text-foreground">
                Fichier production du dossier
              </DialogTitle>
            </DialogHeader>

            <CardContent className="p-4 space-y-3 ">
              {isLoading || PvEnTraitIsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-destructive text-center p-4">
                  Erreur lors du chargement: {error.message}
                </div>
              ) : !files?.length ? (
                <div className="text-muted-foreground text-center p-4">
                  Aucune fiche de production trouvée
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {files.map((fiche) => (
                      <div
                        key={fiche.id_fiche_production}
                        className="p-3 rounded-lg border border-border bg-card"
                      >
                        <input
                          readOnly
                          type="hidden"
                          name="folderId"
                          value={folderId}
                        />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Atelier:</p>
                            <p className="text-foreground">
                              {fiche.nom_atelier}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Client:</p>
                            <p className="text-foreground">
                              {fiche.nom_client}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Département:
                            </p>
                            <p className="text-foreground">
                              {fiche.nom_departement}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">BC:</p>
                            <p className="text-foreground">{fiche.num_bc}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">État:</p>
                          <Badge
                            variant={
                              fiche.etat_fiche === "finie"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {fiche.etat_fiche}
                          </Badge>
                        </div>

                        <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                          <span>
                            Créé:{" "}
                            {new Date(fiche.created_at).toLocaleDateString()}
                          </span>
                          <span>
                            MAJ:{" "}
                            {new Date(fiche.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>

            {files?.length > 0 && (
              <CardFooter className="p-4 border-t border-border">
                {/* <Button
                  type="submit"
                  disabled={!allFinished}
                  className={`w-full ${
                    allFinished
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {allFinished
                    ? "Valider le dossier"
                    : "En attente de validation"}
                </Button> */}
                <Button
                  type="submit"
                  disabled={!allFinished || hasPvInTraitement}
                  className={`w-full ${
                    allFinished && !hasPvInTraitement
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {hasPvInTraitement
                    ? "PV en cours de traitement"
                    : allFinished
                    ? "Valider le dossier"
                    : "En attente de validation"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
