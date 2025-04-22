// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

const orderService = {
  // Get all clients
  getAllOrders: async () => {
    const result = await pool.query("SELECT * FROM detail_commande ");
    return result.rows;
  },

  // Get single client by ID
  getOrderById: async (id_depatement) => {
    const result = await pool.query(
      "SELECT * FROM detail_commande  WHERE id_detail_commande = $1",
      [id_depatement]
    );
    return result.rows[0];
  },

  // Get single client by ID
  getOrderByClientFolderId: async (id_dossier) => {
    // const result = await pool.query(
    //   "SELECT * FROM detail_commande WHERE id_dossier = $1",
    //   [id_dossier]
    // );
    const result = await pool.query(
      `SELECT dc.*, p.designation_produit,p.description_produit
     FROM detail_commande dc
     JOIN produit p ON dc.id_produit = p.id_produit
     WHERE dc.id_dossier = $1`,
      [id_dossier]
    );
    return result.rows;
  },

  // Create new client
  //   createOrder: async (departmentData) => {
  //     const { nom_departement } = departmentData;
  //     const result = await pool.query(
  //       "INSERT INTO detail_commande (nom_departement) VALUES ($1) RETURNING *",
  //       [nom_departement]
  //     );
  //     return result.rows[0];
  //   },

  // Update client
  updateOrder: async (id_detail_commande, orderData) => {
    const { quantite, details, largeur, epaisseur } = orderData;
    const result = await pool.query(
      "UPDATE detail_commande SET quantite = $1,details = $2,largeur = $3,epaisseur = $4 WHERE id_departement = $5 RETURNING *",
      [quantite, details, largeur, epaisseur, id_detail_commande]
    );
    return result.rows[0];
  },

  // Delete client
  deleteOrder: async (id_detail_commande) => {
    const result = await pool.query(
      "DELETE FROM detail_commande WHERE id_detail_commande = $1 RETURNING *",
      [id_detail_commande]
    );
    return result.rows[0];
  },
};
export default orderService;
