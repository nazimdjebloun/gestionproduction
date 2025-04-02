"use server"
import  {ClientformSchema} from "@/schemas/formSchema";
import {  z } from "zod";


export default async function CreateClientFolderAction(prevState, formData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = {
  client: formData.get("client"),
};
    
    try {
        console.log("Raw form data:", data);
        // const validatedData = ClientformSchema.parse(data);
        // console.log("Validated data:", validatedData);
    return {
      success: true,
      message: "Dossier Client ajouté avec succès",
    };
        
    } catch (error) {
        // console.error("Error in CreateClientAction:", error);

   if (error instanceof z.ZodError) {
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