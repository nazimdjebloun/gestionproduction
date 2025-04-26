"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

// Base fetcher function that handles API calls
const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    toast.error(`Failed to load data. Please try again.`);
    throw new Error(`Failed to load data from ${endpoint}`);
  }
};

// Generic hook that uses React Query
export function useFetchData(endpoint, queryKey, formatFn = (data) => data) {
  const query = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetchData(endpoint).then(formatFn),
    staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    isRefetching: query.isRefetching,
    status: query.status,
  };
}

const fetchDataById = async (endpoint, id) => {
  try {
    const response = await axiosInstance.get(`${endpoint}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}/${id}:`, error);
    toast.error(`Failed to load item. Please try again.`);
    throw new Error(`Failed to load data from ${endpoint}/${id}`);
  }
};

export function useFetchDataById(
  endpoint,
  id,
  queryKey,
  formatFn = (data) => data
) {
  const query = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey, id],
    queryFn: () => fetchDataById(endpoint, id).then(formatFn),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    data: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    isRefetching: query.isRefetching,
    status: query.status,
  };
}

export function usePVs() {
  return useFetchData("/api/pvs", "pvs", (pvs) =>
    pvs.map((pv) => ({
      ...pv,
      // Add any transformations here if needed
    }))
  );
}

export function useValidatedPVs() {
  return useFetchData("/api/pvs/valide", ["pvsvalider"], (pvs) =>
    pvs.map((pv) => ({
      ...pv,
      // Add any transformations here if needed
    }))
  );
}

export function usePVById(id) {
  return useFetchDataById("/api/pvs", id, ["pvById"], (pv) => ({
    ...pv,
    // Add any transformations here if needed
  }));
}

export function usePVsByStatus() {
  return useFetchData(`/api/pvs/entraitement`, ["pvsEntraitement"], (pvs) =>
    pvs.map((pv) => ({
      ...pv,
      // Add any transformations here if needed
    }))
  );
}

export function usePVsByDossierId(id_dossier) {
  return useFetchDataById(
    "/api/pvs/dossier",
    id_dossier,
    ["pvsByDossier", id_dossier],
    (pvs) =>
      pvs.map((pv) => ({
        ...pv,
        // Add any transformations here if needed
      }))
  );
}
export function usePVsByDossierIdWithReserve(id_dossier) {
  return useFetchDataById(
    "/api/pvs/dossier/reserve",
    id_dossier,
    ["pvsWithReserveByDossier", id_dossier],
    (pvs) =>
      pvs.map((pv) => ({
        ...pv,
      }))
  );
}
export function usePVsEnTraitementByDossierId(id_dossier) {
  return useFetchData(
    `/api/pvs/dossier/entraitement/${id_dossier}`,
    ["pvsEnTraitementByDossier", id_dossier],
    (pvs) =>
      pvs.map((pv) => ({
        ...pv,
      }))
  );
}

// Specific hooks for each data type
export function useEmployes() {
  return useFetchData("/api/employes", "employes", (employes) =>
    employes.map((employe) => ({
      ...employe,
    }))
  );
}

export function useEmployesById(id) {
  return useFetchDataById(
    "/api/employes",
    id,
    ["employebyFile", id],
    (employe) => ({
      employe,
    })
  );
}

export function useEmployesByFileId(id) {
  return useFetchDataById(
    `/api/employes/productionfile`,
    id,
    ["employesByproductionfile"],
    (employes) =>
      employes?.map((employe) => ({
        ...employe,
      })) || []
  );
}

export function useMaterialByFileId(id) {
  return useFetchDataById(
    "/api/materials/productionfile",
    id,
    ["materialByproductionfile"],
    (materials) =>
      materials?.map((material) => ({
        ...material,
      })) || []
  );
}

export function useMaterialById(id) {
  return useFetchDataById(
    "/api/materials",
    id,
    ["material", id],
    (material) => ({
      material,
    })
  );
}

export function useMaterials() {
  return useFetchData("/api/materials", ["materials"], (materials) =>
    materials.map((material) => ({
      ...material,
    }))
  );
}

// export function useMaterialByFileId(id) {
//   return useFetchDataById(
//     "/api/materials/productionfile",
//     id,
//     ["materialByfile", id],
//     materials.map((material) => ({
//       ...material,
//     }))
//   );
// }

export function useClients() {
  return useFetchData("/api/clients", "clients", (clients) =>
    clients.map((client) => ({
      id_client: client.id_client,
      nom_client: client.nom_client,
    }))
  );
}
export function useClientById(clientId) {
  return useFetchDataById(
    "/api/clients",
    clientId,
    ["client", clientId],
    (client) => ({
      id_client: client.id_client,
      nom_client: client.nom_client,
    })
  );
}

export function useDepartments() {
  return useFetchData("/api/departments", "departments", (departments) =>
    departments.map((dept) => ({
      id_departement: dept.id_departement,
      nom_departement: dept.nom_departement,
    }))
  );
}

export function useDepartmentById(departmentId) {
  return useFetchDataById(
    "/api/departments",
    departmentId,
    ["department", departmentId],
    (department) => ({
      id_departement: department.id_departement,
      nom_departement: department.nom_departement,
    })
  );
}

export function useDepartmentByFolderId(folderId) {
  return useFetchDataById(
    "/api/departments/folder",
    folderId,
    ["department", folderId],
    (department) => ({
      id_departement: department.id_departement,
      nom_departement: department.nom_departement,
    })
  );
}

export function useShops() {
  return useFetchData("/api/shops", "shops", (shops) =>
    shops.map((shop) => ({
      id_atelier: shop.id_atelier,
      nom_atelier: shop.nom_atelier,
      id_departement: shop.id_departement,
    }))
  );
}
// export function useShopByDepartmentId(depId) {
//   return useFetchDataById("/api/shops/dep", depId, ["shop", depId], (shops) =>
//     shops.map((shop) => ({
//       id_atelier: shop.id_atelier,
//       nom_atelier: shop.nom_atelier,
//       id_departement: shop.id_departement,
//     }))
//   );
// }

export function useShopByDepartmentId(departmentId) {
  return useFetchDataById(
    `/api/shops/dep`,
    departmentId,
    ["shops", departmentId],
    (shops) => {
      const shopArray = Array.isArray(shops) ? shops : [shops];
      return shopArray.map((shop) => ({
        id_atelier: shop.id_atelier,
        nom_atelier: shop.nom_atelier,
        id_departement: shop.id_departement,
      }));
    }
  );
}

export function useShopById(shopId) {
  return useFetchDataById("/api/shops", shopId, ["shop", shopId], (shop) => ({
    id_atelier: shop.id_atelier,
    nom_atelier: shop.nom_atelier,
    id_departement: shop.id_departement,
  }));
}

export function useProducts() {
  return useFetchData("/api/products", "products", (products) =>
    products.map((product) => ({
      id_produit: product.id_produit,
      designation_produit: product.designation_produit,
    }))
  );
}
export function useProductById(productId) {
  return useFetchDataById(
    "/api/products",
    productId,
    ["product", productId],
    (product) => ({
      id_produit: product.id_produit,
      designation_produit: product.designation_produit,
    })
  );
}

export function useFolders() {
  return useFetchData(
    "/api/clientfolders",
    ["clientfolders"],
    (clientfolders) =>
      clientfolders.map((clientfolder) => ({
        id_dossier: clientfolder.id_dossier,
        id_client: clientfolder.id_client,
        etat_dossier: clientfolder.etat_dossier,
        nom_client: clientfolder.nom_client,
        id_departement: clientfolder.id_departement,
        nom_departement: clientfolder.nom_departement,
        num_bc: clientfolder.num_bc,
      }))
  );
}

export function useFolderById(folderId) {
  return useFetchDataById(
    "/api/clientfolders",
    folderId,
    ["folder", folderId],
    (folder) => ({
      id_dossier: folder.id_dossier,
      id_client: folder.id_client,
      id_departement: folder.id_departement,
    })
  );
}

export function useFolderProducts(folderId) {
  return useFetchDataById(
    "/api/orders/clientfolder",
    folderId,
    ["clientFolderProducts", folderId],
    (clientFolderProducts) =>
      clientFolderProducts.map((clientFolderProduct) => ({
        id_detail_commande: clientFolderProduct.id_detail_commande,
        designation_produit: clientFolderProduct.designation_produit,
        quantite: clientFolderProduct.quantite,
        details: clientFolderProduct.details,
        largeur: clientFolderProduct.largeur,
        epaisseur: clientFolderProduct.epaisseur,
        id_produit: clientFolderProduct.id_produit,
      }))
  );
}

export function useFiles() {
  return useFetchData(
    "/api/productionfiles",
    "productionfiles", // Changed to array
    (productionfiles) =>
      productionfiles.map((productionfile) => ({
        id_fiche_production: productionfile.id_fiche_production,
        etat_fiche: productionfile.etat_fiche,
        num_bc: productionfile.num_bc,
        date_creation_dossier: productionfile.date_creation_dossier,
        date_creation: productionfile.created_at,
        id_atelier: productionfile.id_atelier,
        nom_client: productionfile.nom_client,
        nom_atelier: productionfile.nom_atelier,
        nom_departement: productionfile.nom_departement,
        id_dossier: productionfile.id_dossier,
      }))
  );
}

export function useFileById(fileId) {
  return useFetchDataById(
    "/api/productionfiles",
    fileId,
    ["file", fileId],
    (file) => ({
      ...file,
    })
  );
}

export function useFileByFolderId(folderId) {
  return useFetchDataById(
    "/api/productionfiles/byfolder",
    folderId,
    ["fileByfolder", folderId],
    // (file) => ({
    // id_fiche_production: file.id_fiche_production,
    // id_atelier: file.id_atelier,
    // num_bc: file.num_bc,
    // nom_client: file.nom_client,
    // nom_atelier: file.nom_atelier,
    // nom_departement: file.nom_departement,
    // id_dossier: file.id_dossier,
    //     ...file,
    //   })
    // );
    (productionfiles) =>
      productionfiles.map((productionfile) => ({
        ...productionfile,
      }))
  );
}

export function useFileProducts(fileId) {
  return useFetchDataById(
    "/api/productionfiles/products",
    fileId,
    ["fileProducts", fileId],
    (fileProducts) =>
      fileProducts.map((fileProduct) => ({
        ...fileProduct,
      }))
  );
}



