"use server";
import axiosInstance from "@/lib/axios";
import { z } from "zod";

export default async function CreateProductionFileAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    department: formData.get("department"),
    shop: formData.get("shop"),
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
  console.log("selectedProducts data:", selectedProducts);

  try {
    // const validatedData = ClientFolderformSchema.parse(data);
    // console.log("Validated data:", validatedData.client);

    // const validatedProducts = ClientFolderProductformSchema.parse({
    //   selectedProducts,
    // });
    // console.log("Validated data:", validatedProducts.selectedProducts);

    // const response = await axiosInstance.post("/api/clientfolder", {
    //   client: validatedData.client,
    //   selectedProducts: validatedProducts.selectedProducts,
    // });

    return {
      success: true,
      message: "fiche production ajouté avec succès",
    };
  } catch (error) {
    // console.error("Error :", error);
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
