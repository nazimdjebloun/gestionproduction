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
import { useShops } from "@/hooks/fetsh-data";
export default function SelectShop({ setShop, state, shop }) {
    const { data: shops, isLoading, refresh } = useShops();
  
  return (
    <div>
      <p className="p-1">Ateliers</p>
      <Select
        defaultValue={shops.length > 0 ? shops[0].id : ""}
        id="shop"
        name="shop"
        value={shop}
        onValueChange={setShop}
      >
        {/* <Input id="department" name="department" /> */}
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Selectionnez un Departement" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Atelier</SelectLabel>
            {shops.map((shop) => (
              <SelectItem key={shop.id_atelier} value={shop.id_atelier}>
                {shop.nom_atelier}
              </SelectItem>
            ))}
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
