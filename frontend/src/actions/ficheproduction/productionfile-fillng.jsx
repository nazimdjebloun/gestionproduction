"use server";
import axiosInstance from "@/lib/axios";
import { z } from "zod";


export default async function ProductionFileFillngAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const hours = formData.get("hours")

  const folder =  formData.get("folder")


  console.log(folder);
  
  // console.log(hours);
    const fileId =  formData.get("fileId")
  
  //geting the selected products and passign them as an array of objects
  const employes = formData.getAll("employes[]");
  const materials = formData.getAll("materials[]");
  let selectedEmployes = [];
  try {
    selectedEmployes = employes.map((employe) => JSON.parse(employe));
  } catch (error) {
    console.error("Error parsing employe JSON:", error);
    return {
      success: false,
      message: "Erreur de format des données produits",
      errors: error,
    };
  }
  let selectedMaterials=[];
  try {
    selectedMaterials = materials.map((material) => JSON.parse(material));
  } catch (error) {
    console.error("Error parsing material JSON:", error);
    return {
      success: false,
      message: "Erreur de format des données produits",
      errors: error,
    };
  }


  try {
    // First API call - update file with hours
    const fileResponse = await axiosInstance.put(
      `/api/productionfiles/${fileId}`,
      {
        hours: hours,
        folder: folder, // This is the correct format - an object containing hours
      }
    );

    // Check if the file update was successful
    if (!fileResponse.data.success) {
      return {
        success: false,
        message: "Échec de la mise à jour des heures",
        errors: fileResponse.data.errors || {
          _form: ["Erreur lors de la mise à jour des heures"],
        },
      };
    }

    const materialsResponse = await axiosInstance.post(
      `/api/productionfiles/materials/${fileId}`,
      {
        selectedMaterials: selectedMaterials,
      }
    );

    // Check if the first response was successful
    if (!materialsResponse.data.success) {
      return {
        success: false,
        message: "Échec de l'ajout des matériaux",
        errors: materialsResponse.data.errors || {
          _form: ["Erreur lors de l'ajout des matériaux"],
        },
      };
    }

    // If materials were added successfully, proceed with employees
    const employesResponse = await axiosInstance.post(
      `/api/productionfiles/employes/${fileId}`,
      {
        selectedEmployes: selectedEmployes,
      }
    );

    // Check if the second response was successful
    if (!employesResponse.data.success) {
      return {
        success: false,
        message: "Matériaux ajoutés mais échec de l'ajout des employés",
        errors: employesResponse.data.errors || {
          _form: ["Erreur lors de l'ajout des employés"],
        },
      };
    }

    // Both calls were successful
    return {
      success: true,
      message: "Fiche production mise à jour avec succès",
    };
  } catch (error) {
    // console.error("Error :", error);
    if (error instanceof z.ZodError) {
      console.error("Error ZodError:", error);
      return {
        success: false,
        message: "Erreur de validation verifier votre formulaire",
        errors: error.flatten().fieldErrors,
        // inputs: data,
      };
    }
    console.error("Error ", error);
    return {
      success: false,
      message: "Une erreur inattendue s'est produite",
      errors: { _form: ["erreur de Server, Veuillez réessayer plus tard"] },
      // inputs: data,
    };
  }
}
