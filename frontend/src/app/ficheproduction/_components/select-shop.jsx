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
import { useShopByDepartmentId, useShops } from "@/hooks/fetsh-data";
export default function SelectShop({ department, shop, setShop, state }) {
  const { data: shops, isLoading, refresh } = useShopByDepartmentId(department);

  return (
    <div>
      <p className="p-1">Ateliers</p>
      <Select
        // defaultValue={shops.length > 0 ? shops[0].id : ""}
        id="shop"
        name="shop"
        value={shop}
        onValueChange={setShop}
        className="w-[50%]"
      >
        <SelectTrigger className="w-[50%]">
          <SelectValue placeholder="Selectionnez un atelier" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Atelier</SelectLabel>
            {shops && shops.length > 0 ? (
              shops.map((shop) => (
                <SelectItem key={shop.id_atelier} value={shop.id_atelier}>
                  {shop.nom_atelier}
                </SelectItem>
              ))
            ) : (
              <SelectLabel>
                {isLoading ? "Chargement..." : "Aucun atelier disponible"}
              </SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {state?.errors?.shop && (
        <p className="text-sm text-red-500 px-2">{state.errors.shop[0]}</p>
      )}
    </div>
  );
}

{
  /* {shops.map((shop) => (
              <SelectItem key={shop.id_atelier} value={shop.id_atelier}>
                {shop.nom_atelier}
              </SelectItem>
            ))} */
}
