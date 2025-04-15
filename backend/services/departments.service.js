// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

const departmentService = {
  // Get all clients
  getAllDepartments: async () => {
    const result = await pool.query("SELECT * FROM departement");
    return result.rows;
  },

  // Get single client by ID
  getDepartmentById: async (id_depatement) => {
    const result = await pool.query(
      "SELECT * FROM departement WHERE id_depatement = $1",
      [id_depatement]
    );
    return result.rows[0];
  },
  // Get single client by ID
  // getDepartmentByFodlerId: async (id_depatement) => {
  //   const result = await pool.query(
  //     "SELECT * FROM departement WHERE id_depatement = $1",
  //     [id_depatement]
  //   );
  //   return result.rows[0];
  // },
  getDepartmentByFolderId: async (folderId) => {
    const result = await pool.query(
      `SELECT d.* 
     FROM departement d
     JOIN dossier ds ON d.id_departement = ds.id_departement
     WHERE ds.id_dossier = $1`,
      [folderId]
    );
    return result.rows[0]; // return null or the department object
  },

  // Create new client
  createDepartment: async (departmentData) => {
    const { nom_departement } = departmentData;
    const result = await pool.query(
      "INSERT INTO departement (nom_departement) VALUES ($1) RETURNING *",
      [nom_departement]
    );
    return result.rows[0];
  },

  // Update client
  updateDepartment: async (id_departement, departmentData) => {
    const { nom_departement } = departmentData;
    const result = await pool.query(
      "UPDATE departement SET nom_departement = $1 WHERE id_departement = $2 RETURNING *",
      [nom_departement, id_departement]
    );
    return result.rows[0];
  },

  // Delete client
  deleteDepartment: async (id_departement) => {
    const result = await pool.query(
      "DELETE FROM departement WHERE id_departement = $1 RETURNING *",
      [id_departement]
    );
    return result.rows[0];
  },
};
export default departmentService;
