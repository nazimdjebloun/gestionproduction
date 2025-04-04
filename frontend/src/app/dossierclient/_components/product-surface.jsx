import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
export default function ProductSurface({
height,
setHeight,
width,
setWidth,
hasSurface,
handleHasSurfaceChange,
}) {

  return (
    <div className="flex justify-start items-center gap-5">
      <div className="flex justify-center items-center content-center gap-2 ">
        <Checkbox
          id="surface"
          name="surface"
          className=""
          checked={hasSurface}
          onCheckedChange={handleHasSurfaceChange}
        />
        <Label htmlFor="surface">
          ce produit a-t-il une spécification de surface
        </Label>
      </div>

      <div className="flex gap-2">
        {/* height input */}
        <div className="flex justify-center flex-col">
          <Label htmlFor="height" className="text-center ">
            Largeur en M
          </Label>
          <Input
            id="height"
            name="height"
            disabled={!hasSurface}
            type="number"
            min="1"
            // defaultValue={1}
            inputMode="numeric"
            value={height}
            onChange={(e) => setHeight(Number.parseInt(e.target.value) || 1)}
            className="mt-1 w-30 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex justify-center items-end p-2">X</div>
        {/* width input */}
        <div className="flex justify-center flex-col">
          <Label htmlFor="width" className="text-center">
            Épaisseur en M
          </Label>
          <Input
            id="width"
            name="width"
            type="number"
            min="1"
            inputMode="numeric"
            // defaultValue={1}
            disabled={!hasSurface}
            value={width}
            onChange={(e) => setWidth(Number.parseInt(e.target.value) || 1)}
            className="mt-1 w-30  text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
