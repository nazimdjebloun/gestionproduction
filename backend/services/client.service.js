// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool



// table client 
// id_client
// nom_client
// email_client
// tel_client
// adresse_client


const clientService = {
  // Get all clients
  getAllClients: async () => {
    const result = await pool.query("SELECT * FROM client");
    return result.rows;
  },

  // Get single client by ID
  getClientById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM client WHERE id_client = $1",
      [id]
    );
    return result.rows[0];
  },

  // Create new client
  createClient: async (clientData) => {
    const { name, email, phone, address } = clientData;
    const result = await pool.query(
      "INSERT INTO client (nom_client, email_client, tel_client,adresse_client) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );
    return result.rows[0];
  },

  // Update client
  updateClient: async (id, clientData) => {
    const { name, email, phone } = clientData;
    const result = await pool.query(
      "UPDATE client SET nom_client = $1, email_client = $2, tel_client = $3 WHERE id_client = $4 RETURNING *",
      [name, email, phone, id]
    );
    return result.rows[0];
  },

  // Delete client
  deleteClient: async (id) => {
    const result = await pool.query(
      "DELETE FROM client WHERE id_client = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
export default clientService;