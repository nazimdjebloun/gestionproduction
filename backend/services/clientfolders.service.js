// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

const clientFolderService = {
  // Get all clients
  getAllClientFolders: async () => {
    const result = await pool.query("SELECT * FROM dossier");
    return result.rows;
  },

  // Get single client by ID
  getClientFolderById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM client WHERE id_dossier = $1",
      [id]
    );
    return result.rows[0];
  },

  // Create new client
  createClientFolder: async (client, selectedProducts) => {
    const  id_client = client;
    const  products = selectedProducts;

    // Insert the folder and get the newly created dossier
    const folderResult = await pool.query(
      "INSERT INTO dossier (id_client) VALUES ($1) RETURNING *",
      [id_client]
    );
    const folder = folderResult.rows[0]; 
    const id_dossier = folder.id_dossier; // Assuming your PK is called this
      console.log("client ", id_client);
      console.log("products ", products);
      console.log("dossier ", id_dossier);
    // Insert each product into detail_commande
    const insertResults = await Promise.all(
      products.map((product) =>
        pool.query(
          `INSERT INTO detail_commande 
          (quantite, details, largeur, epaisseur, id_produit, id_dossier) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
          [
            product.quantity,
            product.productDetails ?? null,
            product.width ?? null,
            product.height ?? null,
            product.id_produit,
            id_dossier, 
          ]
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
  updateClientFolder: async (id, clientData) => {
    const { name, email, phone } = clientData;
    const result = await pool.query(
      "UPDATE client SET nom_client = $1, email_client = $2, tel_client = $3 WHERE id_client = $4 RETURNING *",
      [name, email, phone, id]
    );
    return result.rows[0];
  },

  // Delete client
  deleteClientFolder: async (id) => {
    const result = await pool.query(
      "DELETE FROM client WHERE id_client = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
export default clientFolderService;
