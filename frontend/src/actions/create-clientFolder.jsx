"use server"
import axiosInstance from "@/lib/axios";
import { ClientFolderformSchema } from "@/schemas/formSchema";
import { ClientFolderProductformSchema } from "@/schemas/formSchema";
import { z } from "zod";

export default async function CreateClientFolderAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    client: formData.get("client"),
    department: formData.get("department"),
  };
  console.log(data);

  //geting the selected products and passign them as an array of objects
  const productsStrings = formData.getAll("products[]");
  let selectedProducts = [];
  try {
    selectedProducts = productsStrings.map((productString) =>
      JSON.parse(productString)
    );
  } catch (error) {
    console.error("Error parsing product JSON:", error);
    return {
      success: false,
      message: "Erreur de format des données produits",
      errors: error,
    };
  }

  try {
    //validation of clientr folder data
    const validatedData = ClientFolderformSchema.parse(data);

    //validation of clientr folder selected products
    const validatedProducts = ClientFolderProductformSchema.parse({
      selectedProducts,
    });

    const response = await axiosInstance.post("/api/clientfolders", {
      data: validatedData,
      selectedProducts: validatedProducts.selectedProducts,
    });

    return {
      success: true,
      message: "Dossier Client ajouté avec succès",
    };
  } catch (error) {
    console.error("Error :", error);
    if (error instanceof z.ZodError) {
      console.error("Error ZodError:", error);
      return {
        success: false,
        message: "Erreur de validation verifier votre formulaire",
        errors: error.flatten().fieldErrors,
        inputs: data,
      };
    }
    return {
      success: false,
      message: "Une erreur inattendue s'est produite",
      errors: { _form: ["erreur de Server, Veuillez réessayer plus tard"] },
      inputs: data,
    };
  }
}