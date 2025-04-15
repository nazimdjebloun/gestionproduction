import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientById, useClients, useFolders, useShops } from "@/hooks/fetsh-data";
import { Input } from "@/components/ui/input";



function FolderItem({ folderId, clientId}) {
  // Now we can safely use the hook at the top level of this component
  const { data: client, clientIsLoading } = useClientById(clientId);

  return (
    <SelectItem key={folderId} value={folderId}>
      {clientIsLoading ? "Loading..." : client?.nom_client || folderId}
    </SelectItem>
  );
}



export default function SelectFolder({
  setShop,setFolder,
  state,
  folder,
  setDepartment,
  department,
  setSelectedOrderId,
  setSelectedOrders,
}) {
  const { data: folders, isLoading, refresh } = useFolders();

  useEffect(() => {}, []);

  const handleFolderChange = (folderId) => {
    setFolder(folderId);
    // setShop("");
    // Find the selected folder
    const selectedFolder = folders.find((f) => f.id_dossier === folderId);
    // If found and it has a department ID, update the department
    if (selectedFolder && selectedFolder.id_departement) {
      setDepartment(selectedFolder.id_departement);
      setSelectedOrderId("");
      setSelectedOrders([]);
      setShop("");
    }
  };
  return (
    <div>
      <p className="p-1">les Dossiers clients</p>
      <Select
        // defaultValue={folders.length > 0 ? folders[0].id : ""}
        id="folder"
        name="folder"
        value={folder}
        onValueChange={handleFolderChange}
        className="w-[50%]"
      >
        {/* <Input  value={folder.id_dep} /> */}
        <SelectTrigger className="w-[50%]">
          <SelectValue placeholder="Selectionnez un Dossier" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Dossier</SelectLabel>
            {folders && folders.length > 0 ? (
              folders.map((folder) => (
                <FolderItem
                  key={folder.id_dossier}
                  folderId={folder.id_dossier}
                  clientId={folder.id_client}
                />
              ))
            ) : (
              <SelectLabel>
                {isLoading ? "Chargement..." : "Aucun atelier disponible"}
              </SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {state?.errors?.folder && (
        <p className="text-sm text-red-500 px-2">{state.errors.folder[0]}</p>
      )}
    </div>
  );
}



            // {
            //   folders.map((f) => {
            //     const client = clients.find((c) => c.id_client === f.id_client);
            //     return (
            //       <SelectItem key={f.id_dossier} value={f.id_dossier}>
            //         {client?.nom_client || "Unknown Client"}
            //         {f.id_dossier}
            //       </SelectItem>
            //     );
            //   });
            // }