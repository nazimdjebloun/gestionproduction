// services/shop.service.js
import pool from "../config/db.js"; // PostgreSQL pool

const shopService = {
  // Get all shops
  getAllShops: async () => {
    const result = await pool.query("SELECT * FROM atelier");
    return result.rows;
  },

  // Get single shop by ID
  getShopById: async (id_atelier) => {
    const result = await pool.query(
      "SELECT * FROM atelier WHERE id_atelier = $1",
      [id_atelier]
    );
    return result.rows[0];
  },

  getShopByDepartmentId: async (id_departement) => {
    const result = await pool.query(
      "SELECT * FROM atelier WHERE id_departement = $1",
      [id_departement]
    );
    return result.rows[0];
  },

  // Create new shop
  createShop: async (shopData) => {
    const { nom_atelier, id_departement } = shopData;
    const result = await pool.query(
      "INSERT INTO atelier (nom_atelier, id_departement) VALUES ($1, $2) RETURNING *",
      [nom_atelier, id_departement]
    );
    return result.rows[0];
  },

  // Update shop
  updateShop: async (id_atelier, shopData) => {
    const { nom_atelier, id_departement } = shopData;
    const result = await pool.query(
      "UPDATE atelier SET nom_atelier = $1, id_departement = $2 WHERE id_atelier = $3 RETURNING *",
      [nom_atelier, id_departement, id_atelier]
    );
    return result.rows[0];
  },

  // Delete shop
  deleteShop: async (id_atelier) => {
    const result = await pool.query(
      "DELETE FROM atelier WHERE id_atelier = $1 RETURNING *",
      [id_atelier]
    );
    return result.rows[0];
  },
};

export default shopService;
