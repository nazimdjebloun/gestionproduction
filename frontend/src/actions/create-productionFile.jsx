"use server";
import axiosInstance from "@/lib/axios";
import { z } from "zod";
import { ProductionFileformSchema } from "@/schemas/formSchema";
import { ProductionFileOrderformSchema } from "@/schemas/formSchema";

export default async function CreateProductionFileAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    folder: formData.get("folder"),
    shop: formData.get("shop"),
  };
  //geting the selected products and passign them as an array of objects
  const ordersStrings = formData.getAll("orders[]");
  let selectedOrders = [];
  try {
    selectedOrders = ordersStrings.map((orderString) =>
      JSON.parse(orderString)
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
    // console.log(data);
    const validatedData = ProductionFileformSchema.parse(data);

    const validatedOrders = ProductionFileOrderformSchema.parse({
      selectedOrders,
    });
    // console.log(validatedOrders);
    const response = await axiosInstance.post("/api/productionfiles", {
      data: validatedData,
      selectedOrders: validatedOrders.selectedOrders,
    });

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
    console.error("Error ", error);
    return {
      success: false,
      message: "Une erreur inattendue s'est produite",
      errors: { _form: ["erreur de Server, Veuillez réessayer plus tard"] },
      inputs: data,
    };
  }
}
