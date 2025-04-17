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
import { useDepartments } from "@/hooks/fetsh-data";
export default function SelectDepartment({ setDepartment, state, department }) {
  const { data: departments = [], isLoading, refresh } = useDepartments();

  return (
    <div>
      <p className="p-1">Departement</p>
      <Select
        id="department"
        name="department"
        // value={department || ""}
        // onValueChange={setDepartment}
      >
        {/* <Input id="department" name="department" /> */}
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Selectionnez un Departement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Departement</SelectLabel>

            {departments && departments.length > 0 ? (
              departments.map((department) => (
                <SelectItem
                  key={department.id_departement}
                  value={department.id_departement}
                >
                  {department.nom_departement}
                </SelectItem>
              ))
            ) : (
              <SelectLabel>
                {isLoading ? "Chargement..." : "Aucun département disponible"}
              </SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {state?.errors?.department && (
        <p className="text-sm text-red-500 px-2">
          {state.errors.department[0]}
        </p>
      )}
    </div>
  );
}

{
  /* {departments.map((department) => (
              <SelectItem
                key={department.id_departement}
                value={department.id_departement}
              >
                {department.nom_departement}
              </SelectItem>
            ))} */
}
