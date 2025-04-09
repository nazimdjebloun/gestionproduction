// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

const productionFileService = {
  // Get all clients
  getAllProductionFiles: async () => {
    const result = await pool.query("SELECT * FROM fiche_production");
    return result.rows;
  },

  // Get single client by ID
  getProductionFileById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM fiche_production WHERE id_fiche_production = $1",
      [id]
    );
    return result.rows[0];
  },

  // Create new client
  createProductionFile: async (data, selectedProducts) => {
    const { id_dossier, id_atelier } = data;
    const products = selectedProducts;

    // Insert the folder and get the newly created dossier
    const folderResult = await pool.query(
      "INSERT INTO fiche_production (id_dossier,id_atelier) VALUES ($1,$2) RETURNING *",
      [id_dossier, id_atelier]
    );

    // Insert each product into detail_commande
    const insertResults = await Promise.all(
      products.map((product) =>
        pool.query(
          `INSERT INTO commande_fiche
          (id_produit, id_dossier) 
         VALUES ($1) 
         RETURNING *`,
          [product.id_produit, id_dossier]
        )
      )
    );

    console.log(
      "Inserted details:",
      insertResults.map((r) => r.rows[0])
    );
    console.log("Created folder:", folder);

    return folder;
  },

  // Update client
  updateProductionFile: async (id, clientData) => {
    const { name, email, phone } = clientData;
    const result = await pool.query(
      "UPDATE fiche_production  SET nom_client = $1, email_client = $2, tel_client = $3 WHERE id_client = $4 RETURNING *",
      [name, email, phone, id]
    );
    return result.rows[0];
  },

  // Delete client
  deleteProductionFile: async (id) => {
    const result = await pool.query(
      "DELETE FROM fiche_production  WHERE id_fiche_production  = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
export default productionFileService;
