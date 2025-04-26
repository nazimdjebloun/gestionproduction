"use server";
import axiosInstance from "@/lib/axios";
import { ClientformSchema } from "@/schemas/formSchema";
import { z } from "zod";

export default async function RejectPvAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
    const pvId = formData.get("pvId");
    const reserve = formData.get("reserve");
    console.log(" pvId:", pvId);
    console.log(" reserve:", reserve);

  try {
    const response = await axiosInstance.put(`/api/pvs/rejete/${pvId}`, {
      reserve,
    });

    return {
      success: true,
      message: "pv rejecter reserver disponible dans les dossier clients",
      // PV: response.data,
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
