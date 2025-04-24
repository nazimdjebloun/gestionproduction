import pool from "../config/db.js"; // PostgreSQL pool

const materialService = {
  // Get all materials
  getAllMaterials: async () => {
    const result = await pool.query("SELECT * FROM matiere_premiere");
    return result.rows;
  },

  // Get a single material by ID
  getMaterialById: async (id_matiere) => {
    const result = await pool.query(
      "SELECT * FROM matiere_premiere WHERE id_matiere = $1",
      [id_matiere]
    );
    return result.rows[0];
  },

  // Create a new material
  createMaterial: async (materialData) => {
    const { designation_matiere, description_matiere } = materialData;
    const result = await pool.query(
      "INSERT INTO matiere_premiere (designation_matiere, description_matiere) VALUES ($1, $2) RETURNING *",
      [designation_matiere, description_matiere]
    );
    return result.rows[0];
  },

  // Update a material
  updateMaterial: async (id_matiere, materialData) => {
    const { designation_matiere, description_matiere } = materialData;
    const result = await pool.query(
      `UPDATE matiere_premiere SET 
        designation_matiere = $1,
        description_matiere = $2,
      WHERE id_matiere = $3 RETURNING *`,
      [designation_matiere, description_matiere, id_matiere]
    );
    return result.rows[0];
  },

  // Delete a material
  deleteMaterial: async (id_matiere) => {
    const result = await pool.query(
      "DELETE FROM matiere_premiere WHERE id_matiere = $1 RETURNING *",
      [id_matiere]
    );
    return result.rows[0];
  },
};

export default materialService;
