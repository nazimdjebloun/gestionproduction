import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients, useFolders, useShops } from "@/hooks/fetsh-data";
export default function SelectFolder({ setFolder, state, folder }) {
  const { data: folders, isLoading, refresh } = useFolders();
  const { data: clients, clientsIsLoading, clientsRefresh } = useClients();

  return (
    <div>
      <p className="p-1">les Dossiers clients</p>
      <Select
        defaultValue={folders.length > 0 ? folders[0].id : ""}
        id="folder"
        name="folder"
        value={folder}
        onValueChange={setFolder}
      >
        {/* <Input id="department" name="department" /> */}
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Selectionnez un Departement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>dossier</SelectLabel>
            {folders.map((folder) => {
              const client = clients.find(
                (c) => c.id_client === folder.id_client
              );
              return (
                <SelectItem key={folder.id_dossier} value={folder.id_dossier}>
                  {client?.nom_client || "Unknown Client"}

                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* {state?.errors?.department && (
        <p className="text-sm text-red-500 px-2">
          {state.errors.department[0]}
        </p>
      )} */}
    </div>
  );
}
