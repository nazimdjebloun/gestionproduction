"use server";
import axiosInstance from "@/lib/axios";
export default async function DeleteClientAction(id) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await axiosInstance.delete(`/api/clients/${id}`);
    return {
      success: true,
      message: "Client supprimer avec succès",
    };
  } catch (error) {
    console.error("Error in CreateClientAction:", error);
    return {
      success: false,
      message: "Une erreur inattendue s'est produite dans la req de suppression",
    };
  }
}
