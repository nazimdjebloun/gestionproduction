"use server";
import axiosInstance from "@/lib/axios";
import { ClientformSchema } from "@/schemas/formSchema";
import { z } from "zod";

export default async function EditClientAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };

  try {
    // console.log("Raw form data:", data);
    const validatedData = ClientformSchema.parse(data);
    console.log("Validated data:", validatedData);
    const response = await axiosInstance.put(
      `/api/clients/${data.id}`,
      validatedData
    );
    return {
      success: true,
      message: "Client Modifer avec succès",
    };
  } catch (error) {
    console.error("Error in EditClientAction:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Erreur de validation verifier votre formulaire",
        errors: error.flatten().fieldErrors,
        inputs: prevState,
      };
    }
    return {
      success: false,
      message: "Une erreur inattendue s'est produite",
      errors: { _form: ["erreur de Server, Veuillez réessayer plus tard"] },
      inputs: prevState,
    };
  }
}
