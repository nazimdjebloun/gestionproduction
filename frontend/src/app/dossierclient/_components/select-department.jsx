import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SelectDepartment({
  setDepartment,
  state,
  department,
  departmentValues,
}) {
  return (
    <div>
      <p className="p-1">Departement</p>
      <Select
        defaultValue={departmentValues.length > 0 ? departmentValues[0].id : ""}
        id="department"
        name="department"
        // value={department}
        // onValueChange={setDepartment}
      >
        {/* <Input id="department" name="department" /> */}
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Selectionnez un Departement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Departement</SelectLabel>
            {departmentValues.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name}
              </SelectItem>
            ))}
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="affichage">Affichage</SelectItem>
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
