"use server";
import axiosInstance from "@/lib/axios";
import { ClientformSchema } from "@/schemas/formSchema";
import { z } from "zod";

export default async function ValidatePvAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const pvId = formData.get("pvId");
    console.log(" pvId:", pvId);

  try {
    const response = await axiosInstance.put(`/api/pvs/valide/${pvId}`);

    return {
      success: true,
      message: "pv valider avec succès",
      // PV: response,
    };
  } catch (error) {
    console.error("Error in pv:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Erreur de validation verifier votre formulaire",
        errors: error.flatten().fieldErrors,
        // inputs: response,
      };
    }
    return {
      success: false,
      message: "Une erreur inattendue s'est produite",
      errors: { _form: ["erreur de Server, Veuillez réessayer plus tard"] },
      //   inputs: response,
    };
  }
}
