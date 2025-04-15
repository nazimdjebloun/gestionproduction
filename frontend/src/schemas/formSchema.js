
import { z } from "zod";

export  const ClientformSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(1, { message: "Adresse est requis" }),
});


export const ClientFolderformSchema = z.object({
  client: z.string().min(1, { message: "veuillez choisir un client" }),
  department: z.string().min(1, { message: "veuillez choisir un departement" }),
});
export const ClientFolderProductformSchema = z.object({
  selectedProducts: z.array(z.any()).min(1, "Au moins un produit est requis"),
});

export const ProductionFileformSchema = z.object({
  folder: z.string().min(1, { message: "veuillez choisir un dossier client" }),
  shop: z.string().min(1, { message: "veuillez choisir un atelier" }),
});
export const ProductionFileOrderformSchema = z.object({
  selectedOrders: z.array(z.any()).min(1, "Au moins une commande est requis"),
});





// export const ClientFolderProductformSchema = z.object({
//   selectedProducts: z.array().min(1, "Au moins un produit est requis"),
// });

// export const ClientFolderProductformSchema = z
//   .array(z.any())
//   .min(1, "Au moins un produit est requis");
