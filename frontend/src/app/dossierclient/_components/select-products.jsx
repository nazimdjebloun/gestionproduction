"use client";
import React from "react";
import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SelectProducts({
  selectedProductId,
  availableProducts,
  setSelectedProductId,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <span>Produits</span>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mt-1"
        >
          {selectedProductId
            ? availableProducts.find(
                (product) => product.id_produit === selectedProductId
              )?.designation_produit
            : "Rechrcher un produit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Recherche..." />
          <CommandList>
            <CommandEmpty>Aucun produit trouve.</CommandEmpty>
            <CommandGroup>
              {availableProducts.map((product) => (
                <CommandItem
                  // key=`${product.id}-${index}`
                  key={product.id_produit}
                  value={product.designation_produit}
                  onSelect={() => {
                    setSelectedProductId(
                      product.id_produit === selectedProductId
                        ? ""
                        : product.id_produit
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProductId === product.id_produit
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span>{product.designation_produit}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
  // return (
  //   <div className="container w-full  py-10">
  //     <Card className="w-full ">
  //       <CardHeader>
  //         <CardTitle>Selection des produits</CardTitle>
  //         <CardDescription>
  //           Sélectionnez les produits à ajouter à votre dossier clients. Vous
  //           pouvez ajouter plusieurs produits avant de valider votre commande.
  //         </CardDescription>
  //       </CardHeader>

  //       <CardContent className="space-y-6">
  //         <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end ">
  //           <div className="w-full sm:w-3/4">
  //             <Popover open={open} onOpenChange={setOpen}>
  //               <span>Produits</span>
  //               <PopoverTrigger asChild>
  //                 <Button
  //                   variant="outline"
  //                   role="combobox"
  //                   aria-expanded={open}
  //                   className="w-full justify-between mt-1"
  //                 >
  //                   {selectedProductId
  //                     ? availableProducts.find(
  //                         (product) => product.id === selectedProductId
  //                       )?.name
  //                     : "Rechrcher un produit..."}
  //                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //                 </Button>
  //               </PopoverTrigger>
  //               <PopoverContent className="w-full p-0">
  //                 <Command>
  //                   <CommandInput placeholder="Recherche..." />
  //                   <CommandList>
  //                     <CommandEmpty>Aucun produit trouve.</CommandEmpty>
  //                     <CommandGroup>
  //                       {availableProducts.map((product) => (
  //                         <CommandItem
  //                           // key=`${product.id}-${index}`
  //                           key={product.id}
  //                           value={product.name}
  //                           onSelect={() => {
  //                             setSelectedProductId(
  //                               product.id === selectedProductId
  //                                 ? ""
  //                                 : product.id
  //                             );
  //                             setOpen(false);
  //                           }}
  //                         >
  //                           <Check
  //                             className={cn(
  //                               "mr-2 h-4 w-4",
  //                               selectedProductId === product.id
  //                                 ? "opacity-100"
  //                                 : "opacity-0"
  //                             )}
  //                           />
  //                           <span>{product.name}</span>
  //                         </CommandItem>
  //                       ))}
  //                     </CommandGroup>
  //                   </CommandList>
  //                 </Command>
  //               </PopoverContent>
  //             </Popover>
  //           </div>
  //           <div className="w-fit ">
  //             <Label htmlFor="quantity">Quantité</Label>
  //             <div className="flex items-center mt-1">
  //               <Button
  //                 type="button"
  //                 variant="outline"
  //                 size="icon"
  //                 className="w-8 rounded-r-none"
  //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
  //                 disabled={quantity <= 1}
  //               >
  //                 <Minus className="h-3 w-3" />
  //                 <span className="sr-only">Diminuer la quantite</span>
  //               </Button>
  //               <Input
  //                 id="quantity"
  //                 type="number"
  //                 min="1"
  //                 value={quantity}
  //                 onChange={(e) =>
  //                   setQuantity(Number.parseInt(e.target.value) || 1)
  //                 }
  //                 className="w-30 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  //               />
  //               <Button
  //                 type="button"
  //                 variant="outline"
  //                 size="icon"
  //                 className="w-8 rounded-l-none"
  //                 onClick={() => setQuantity(quantity + 1)}
  //               >
  //                 <Plus className="h-3 w-3" />
  //                 <span className="sr-only">Augmenter la quantite</span>
  //               </Button>
  //             </div>
  //           </div>

  //           <Button
  //             type="button"
  //             onClick={handleAddProduct}
  //             className="sm:w-1/4 flex flex-row justify-center items-center gap-1"
  //           >
  //             <PlusCircle className=" h-4 w-4" />
  //             <span className=" font-bold">Ajouter</span>
  //           </Button>
  //         </div>

  //         {/* extra info of product section   */}
  //         <div className="flex flex-col gap-2 w-full ">
  //           {/* input product details  */}
  //           <div className="w-full">
  //             <Label htmlFor="details">Détails</Label>
  //             <Textarea
  //               id="details"
  //               name="details"
  //               value={productDetails}
  //               onChange={(e) => setProductDetails(e.target.value)}
  //               type="text"
  //               placeholder="Détails supplémentaires sur le produit sélectionné"
  //               rows={3}
  //               className="mt-1"
  //             />
  //           </div>

  //           {/* input product surface  */}

  //           {/* surface  checkbox*/}
  //           <div className="flex justify-start items-center gap-5">
  //             <div className="flex justify-center items-center content-center gap-2 ">
  //               <Checkbox
  //                 id="surface"
  //                 className=""
  //                 checked={hasSurface}
  //                 onCheckedChange={handleHasSurfaceChange}
  //               />
  //               <Label htmlFor="surface">
  //                 ce produit a-t-il une spécification de surface
  //               </Label>
  //             </div>

  //             <div className="flex gap-2">
  //               {/* height input */}
  //               <div className="flex justify-center flex-col">
  //                 <Label htmlFor="height" className="text-center ">
  //                   Largeur en M
  //                 </Label>
  //                 <Input
  //                   id="height"
  //                   disabled={!hasSurface}
  //                   type="number"
  //                   min="1"
  //                   value={height}
  //                   onChange={(e) =>
  //                     setHeight(Number.parseInt(e.target.value) || 1)
  //                   }
  //                   className="mt-1 w-30 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  //                 />
  //               </div>
  //               <div className="flex justify-center items-end p-2">X</div>
  //               {/* width input */}
  //               <div className="flex justify-center flex-col">
  //                 <Label htmlFor="width" className="text-center">
  //                   Épaisseur en M
  //                 </Label>
  //                 <Input
  //                   id="width"
  //                   type="width"
  //                   min="1"
  //                   disabled={!hasSurface}
  //                   value={width}
  //                   onChange={(e) =>
  //                     setWidth(Number.parseInt(e.target.value) || 1)
  //                   }
  //                   className="mt-1 w-30  text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* list of the selected products  */}
  //         <div className="border rounded-md">
  //           <div className="p-4 border-b bg-muted/50">
  //             <h3 className="font-medium">Selected Products</h3>
  //           </div>
  //           {selectedProducts.length === 0 ? (
  //             <div className="p-4 text-center text-muted-foreground">
  //               Aucun produit sélectionné
  //             </div>
  //           ) : (
  //             <div className="divide-y-1">
  //               {selectedProducts.map((product, index) => (
  //                 <div
  //                   key={product.uniqueId}
  //                   className="p-4 flex justify-between items-center"
  //                 >
  //                   <div className="flex justify-between items-center  w-full">
  //                     <div className="">
  //                       <div className="font-medium gap-3 flex">
  //                         <span className="font-bold">{product.quantity}</span>
  //                         <p>{product.name}</p>
  //                       </div>
  //                       <div className="">
  //                         {product.productDetails && (
  //                           <div className="text-sm  mt-1 text-muted-foreground space-x-2">
  //                             <span className="font-bold">Details :</span>
  //                             <span>{product.productDetails}</span>
  //                           </div>
  //                         )}

  //                         {product.surface && (
  //                           <div className="text-sm mt-1 text-muted-foreground space-x-2">
  //                             <span className="font-bold"> surface :</span>
  //                             <span>{product.surface.height}</span>
  //                             <span>X</span>
  //                             <span>{product.surface.width} </span>
  //                           </div>
  //                         )}
  //                       </div>
  //                     </div>
  //                   </div>

  //                   <Button
  //                     type="button"
  //                     variant="ghost"
  //                     size="icon"
  //                     onClick={() => handleRemoveProduct(product.uniqueId)}
  //                     className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
  //                   >
  //                     <Trash2 className="h-4 w-4" />
  //                     <span className="sr-only">Remove {product.name}</span>
  //                   </Button>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       </CardContent>

  //       <CardFooter className="flex justify-end gap-2">
  //         <Button
  //           type="button"
  //           variant="outline"
  //           onClick={() => setSelectedProducts([])}
  //           disabled={selectedProducts.length === 0}
  //         >
  //           Supprimer tous
  //         </Button>
  //       </CardFooter>
  //     </Card>
  //   </div>
  // );
//}

{
  /* can remove later  */
}
{
  /* {selectedProducts.length > 0 && (
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm font-medium">
                  Total Products: {selectedProducts.length}
                </p>
                <p className="text-sm font-medium">
                  Total Price: $
                  {selectedProducts
                    .reduce((sum, product) => sum + product.price, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          )} */
}

{
  /* input product quantite  */
}
{
  /* <div className="w-fit">
              <Label htmlFor="quantity">Quantite</Label>
              <div className="flex items-center mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-8 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Diminuer la quantite</span>
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Number.parseInt(e.target.value) || 1)
                  }
                  className="w-30 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-8 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Augmenter la quantite</span>
                </Button>
              </div>
            </div> */
}
