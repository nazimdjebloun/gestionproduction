// services/employe.service.js
import pool from "../config/db.js"; // PostgreSQL pool

const employeService = {
  // Get all employees
  getAllEmployes: async () => {
    const result = await pool.query("SELECT * FROM employe");
    return result.rows;
  },

  // Get single employee by ID
  getEmployeById: async (id_employe) => {
    const result = await pool.query(
      "SELECT * FROM employe WHERE id_employe = $1",
      [id_employe]
    );
    return result.rows[0];
  },

  // Create new employee
  createEmploye: async (employeData) => {
    const { nom_employe, prenom_employe, date_nais, tel_employe, id_atelier } =
      employeData;

    const result = await pool.query(
      `INSERT INTO employe (
        nom_employe,
        prenom_employe,
        date_nais,
        tel_employe,
        id_atelier
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nom_employe, prenom_employe, date_nais, tel_employe, id_atelier]
    );

    return result.rows[0];
  },

  // Update employee
  updateEmploye: async (id_employe, employeData) => {
    const { nom_employe, prenom_employe, date_nais, tel_employe, id_atelier } =
      employeData;

    const result = await pool.query(
      `UPDATE employe SET
        nom_employe = $1,
        prenom_employe = $2,
        date_nais = $3,
        tel_employe = $4,
        id_atelier = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id_employe = $6
      RETURNING *`,
      [
        nom_employe,
        prenom_employe,
        date_nais,
        tel_employe,
        id_atelier,
        id_employe,
      ]
    );

    return result.rows[0];
  },

  // Delete employee
  deleteEmploye: async (id_employe) => {
    const result = await pool.query(
      "DELETE FROM employe WHERE id_employe = $1 RETURNING *",
      [id_employe]
    );
    return result.rows[0];
  },
};

export default employeService;
