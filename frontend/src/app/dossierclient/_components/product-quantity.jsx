import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Minus, Plus } from 'lucide-react';
import React from 'react'

export default function ProductQuantity({ quantity, setQuantity, state }) {
  return (
    <div className="w-fit ">
      <Label htmlFor="quantity" className="">
        Quantité
      </Label>
      <div className="flex items-center mt-1 gap-1">
        {/* <Button
          type="button"
          variant="outline"
          size="icon"
          // className="w-8 rounded-r-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Diminuer la quantite</span>
        </Button> */}
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          inputMode="numeric"
          // defaultValue="1"
          // defaultValue={state?.inputs?.quantity || "1"}
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
          // className="w-30 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          className="w-30  text-center [appearance:textfield]  "
        />
        {/* {state?.errors?.quantity && (
          <p className="text-sm text-red-500">{state.errors.quantity[0]}</p>
        )} */}
        {/* <Button
          type="button"
          variant="outline"
          size="icon"
          // className="w-8 rounded-l-none"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Augmenter la quantite</span>
        </Button> */}
      </div>
    </div>
  );
}
