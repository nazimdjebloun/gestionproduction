// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

const productService = {
  // Get all clients
  getAllProducts: async () => {
    const result = await pool.query("SELECT * FROM produit");
    return result.rows;
  },

  // Get single client by ID
  getProductById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM produit WHERE id_produit = $1",
      [id]
    );
    return result.rows[0];
  },

  // Create new client
  createProduct: async (PoductData) => {
    const { designation, description, type } = PoductData;
    const result = await pool.query(
      "INSERT INTO produit (designation_produit, description_produit, id_type_produit) VALUES ($1, $2, $3) RETURNING *",
      [designation, description, type, id]
    );
    return result.rows[0];
  },

  // Update client
  updateProduct: async (id, PoductData) => {
    const { designation, description, type } = PoductData;
    const result = await pool.query(
      "UPDATE produit SET designation_produit = $1, description_produit = $2, id_type_produit = $3 WHERE id_produit = $4 RETURNING *",
      [designation, description, type, id]
    );
    return result.rows[0];
  },

  // Delete client
  deleteProduct: async (id) => {
    const result = await pool.query(
      "DELETE FROM produit WHERE id_produit = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
export default productService;
