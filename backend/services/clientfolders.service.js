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
    //     d.id_dossier,
    // d.num_bc,
    // d.date_creation,
    const query = `
      SELECT
        d.*,
        c.nom_client ,
        dep.nom_departement
      FROM dossier d
      JOIN client c ON d.id_client = c.id_client
      JOIN departement dep ON d.id_departement = dep.id_departement
          WHERE d.etat_dossier IN ('encours', 'entraitement')
          ORDER BY d.date_creation DESC
    `;

    // const result = await pool.query("SELECT * FROM dossier");
    const result = await pool.query(query);
    return result.rows;
  },

  // Get single client by ID
  getClientFolderById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM dossier WHERE id_dossier = $1",
      [id]
    );
    return result.rows[0];
  },
  getClientFolderByclientId: async (id) => {
    const query = `
      SELECT
        d.*,
        c.nom_client ,
        dep.nom_departement
      FROM dossier d
      JOIN client c ON d.id_client = c.id_client
      JOIN departement dep ON d.id_departement = dep.id_departement
      WHERE d.id_client = $1
          ORDER BY d.date_creation DESC
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  },

  // Create new client
  createClientFolder: async (data, selectedProducts) => {
    const { client, department, bc } = data;
    const products = selectedProducts;
    const folderResult = await pool.query(
      "INSERT INTO dossier (id_client, id_departement,num_bc) VALUES ($1,$2,$3) RETURNING *",
      [client, department, bc]
    );
    const folder = folderResult.rows[0];
    const id_dossier = folder.id_dossier;

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
