
import { z } from "zod";

export  const ClientformSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(1, { message: "Adresse est requis" }),
});


export const ClientFolderformSchema = z.object({
  client: z.string().min(1, { message: "veuillez choisir un client" }),
  // department: z.enum(["production", "affichage"], {
  //   errorMap: () => ({ message: "veuillez choisir un departement" }),
  // }),
  department: z.string().min(1, { message: "veuillez choisir un departement" }),
});

// export const ClientFolderProductformSchema = z.object({
//   selectedProducts: z.array().min(1, "Au moins un produit est requis"),
// });

// export const ClientFolderProductformSchema = z
//   .array(z.any())
//   .min(1, "Au moins un produit est requis");

export const ClientFolderProductformSchema = z.object({
  selectedProducts: z.array(z.any()).min(1, "Au moins un produit est requis"),
});