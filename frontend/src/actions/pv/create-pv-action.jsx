"use server"
import axiosInstance from "@/lib/axios";
import { ClientformSchema } from "@/schemas/formSchema";
import { z } from "zod";

export default async function CreatePv(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const folderId = formData.get("folderId");


  try {
    console.log(" folderId:", folderId);
    const response = await axiosInstance.post(`/api/pvs/${folderId}`);

    return {
      success: true,
      message: "pv cree avec succès",
      //   createdPV: response.data,
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