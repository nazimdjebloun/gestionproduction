// services/pv.service.js
import pool from "../config/db.js"; // PostgreSQL pool

const pvService = {
  // Get all PVs
  getAllPVs: async () => {
    try {
      const query = `
		SELECT 
    p.*,
    d.id_dossier,
    d.date_creation as date_creation_dossier,
    d.num_bc,
    d.etat_dossier,
    c.id_client,
    c.nom_client,
    c.adresse_client,
    c.tel_client,
    dep.id_departement,
    dep.nom_departement
FROM 
    pv p
JOIN 
    dossier d ON p.id_dossier = d.id_dossier
JOIN 
    client c ON d.id_client = c.id_client
JOIN 
    departement dep ON d.id_departement = dep.id_departement
WHERE 
    p.etat_pv = $1
ORDER BY 
    p.date_creation DESC;
    `;
      const result = await pool.query(query, ["entraitement"]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching all PVs:", error);
      throw error;
    }
  },
  getPVsValidated: async () => {
    try {
      const query = `
      SELECT 
        p.*,
        d.id_dossier,
        d.date_creation AS date_creation_dossier,
        d.num_bc,
        d.etat_dossier,
        c.id_client,
        c.nom_client,
        c.adresse_client,
        c.tel_client,
        dep.id_departement,
        dep.nom_departement
      FROM 
        pv p
      JOIN 
        dossier d ON p.id_dossier = d.id_dossier
      JOIN 
        client c ON d.id_client = c.id_client
      JOIN 
        departement dep ON d.id_departement = dep.id_departement
      WHERE 
        p.etat_pv = 'valide'
      ORDER BY 
        p.date_creation DESC;
    `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching validated PVs:", error);
      throw error;
    }
  },
  getPVsByStatus: async (status) => {
    const query = `
            SELECT p.*, d.num_bc, c.nom_client 
            FROM pv p
            JOIN dossier d ON p.id_dossier = d.id_dossier
            JOIN client c ON d.id_client = c.id_client
            WHERE p.etat_pv = $1
            ORDER BY p.date_creation DESC
        `;
    const result = await pool.query(query, [status]);
    return result.rows;
  },
  getPVsByDossierIdAndStatus: async (id_dossier) => {
    const query = `
            SELECT p.*, d.num_bc, c.nom_client 
            FROM pv p
            JOIN dossier d ON p.id_dossier = d.id_dossier
            JOIN client c ON d.id_client = c.id_client
            WHERE p.id_dossier = $1 AND p.etat_pv = $2
            ORDER BY p.date_creation DESC
        `;
    const result = await pool.query(query, [id_dossier, "entraitement"]);
    return result.rows;
  },
  getPVsByDossierId: async (id_dossier) => {
    const query = `
            SELECT p.*, d.num_bc, c.nom_client 
            FROM pv p
            JOIN dossier d ON p.id_dossier = d.id_dossier
            JOIN client c ON d.id_client = c.id_client
            WHERE p.id_dossier = $1
            ORDER BY p.date_creation DESC
        `;
    const result = await pool.query(query, [id_dossier]);
    return result.rows;
  },
  // Get PVs with reservation
  getPVsWithReservation: async () => {
    try {
      const query = `
                SELECT 
                    pv.*,
                    dossier.num_bc,
                    client.nom_client
                FROM pv
                JOIN dossier ON pv.id_dossier = dossier.id_dossier
                JOIN client ON dossier.id_client = client.id_client
                WHERE pv.reserve IS NOT NULL
                ORDER BY pv.date_creation DESC
            `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching PVs with reservation:", error);
      throw error;
    }
  },
  getPVsByDossierIdWithReserve: async (id_dossier) => {
    const query = `
            SELECT p.*, d.num_bc, c.nom_client 
            FROM pv p
            JOIN dossier d ON p.id_dossier = d.id_dossier
            JOIN client c ON d.id_client = c.id_client
            WHERE p.id_dossier = $1 AND p.reserve IS NOT NULL
            ORDER BY p.date_creation DESC
        `;
    const result = await pool.query(query, [id_dossier]);
    return result.rows;
  },
  // Get single PV by ID
  //   getPVById: async (id) => {
  //     try {
  //       const query = `
  // SELECT
  //     pv.*,
  //     dossier.*,
  //     client.*,
  //     detail_commande.*,
  //     produit.*
  // FROM
  //     pv
  // JOIN
  //     dossier ON pv.id_dossier = dossier.id_dossier
  // JOIN
  //     client ON dossier.id_client = client.id_client
  // LEFT JOIN
  //     detail_commande ON dossier.id_dossier = detail_commande.id_dossier
  // LEFT JOIN
  //     produit ON detail_commande.id_produit = produit.id_produit
  // WHERE
  //     pv.id_pv = $1;
  //             `;
  //       const result = await pool.query(query, [id]);
  //       return result.rows[0] || null;
  //     } catch (error) {
  //       console.error("Error fetching PV by ID:", error);
  //       throw error;
  //     }
  //   },
  getPVById: async (id) => {
    try {
      const query = `
      SELECT 
          pv.*,
          dossier.*,
          client.*,
          detail_commande.*,
          produit.*
      FROM 
          pv
      JOIN 
          dossier ON pv.id_dossier = dossier.id_dossier
      JOIN 
          client ON dossier.id_client = client.id_client
      LEFT JOIN 
          detail_commande ON dossier.id_dossier = detail_commande.id_dossier
      LEFT JOIN 
          produit ON detail_commande.id_produit = produit.id_produit
      WHERE 
          pv.id_pv = $1;
    `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      const firstRow = result.rows[0];

      // Build the grouped structure
      const pvData = {
        pv: {
          id_pv: firstRow.id_pv,
          date_creation: firstRow.date_creation,
          reserve: firstRow.reserve,
          created_at: firstRow.created_at,
          etat_pv: firstRow.etat_pv,
          // Add any other pv fields you have
        },
        dossier: {
          id_dossier: firstRow.id_dossier,
          date_creation: firstRow.dossier_date_creation, // rename if needed
          num_bc: firstRow.num_bc,
          etat_dossier: firstRow.etat_dossier,
          // etc
        },
        client: {
          id_client: firstRow.id_client,
          nom_client: firstRow.nom_client,
          adresse_client: firstRow.adresse_client,
          tel_client: firstRow.tel_client,
          email_client: firstRow.email_client,
        },
        details: result.rows.map((row) => ({
          detail_commande: {
            id_detail_commande: row.id_detail_commande,
            quantite: row.quantite,
            details: row.details,
            largeur: row.largeur,
            epaisseur: row.epaisseur,
          },
          produit: {
            id_produit: row.id_produit,
            designation_produit: row.designation_produit,
            description_produit: row.description_produit,
            id_type_produit: row.id_type_produit,
          },
        })),
      };

      return pvData;
    } catch (error) {
      console.error("Error fetching PV by ID:", error);
      throw error;
    }
  },
  // Create new PV
  createPV: async (folderId) => {
    console.log(folderId);
    try {
      const query = `
                INSERT INTO pv (
                    id_dossier
                ) 
                VALUES ($1) 
                RETURNING *
            `;
      const result = await pool.query(query, [folderId.id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating PV:", error);
      throw error;
    }
  },

  // Update PV
  updatePV: async (id, pvData) => {
    try {
      const { motif, reserve, id_dossier } = pvData;
      const query = `
                UPDATE pv 
                SET 
                    motif = $1,
                    reserve = $2,
                    id_dossier = $3,
                    updated_at = NOW()
                WHERE id_pv = $4
                RETURNING *
            `;
      const result = await pool.query(query, [motif, reserve, id_dossier, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error updating PV:", error);
      throw error;
    }
  },
  updatePVvalide: async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Start transaction

      // 1. First update the PV and get the dossier ID
      const pvQuery = `
      UPDATE pv 
      SET etat_pv = $1
      WHERE id_pv = $2
      RETURNING id_dossier
    `;
      const pvResult = await client.query(pvQuery, ["valide", id]);

      if (pvResult.rows.length === 0) {
        throw new Error("PV not found");
      }

      const dossierId = pvResult.rows[0].id_dossier;

      // 2. Update the associated dossier
      const dossierQuery = `
      UPDATE dossier
      SET etat_dossier = $1
      WHERE id_dossier = $2
      RETURNING *
    `;
      const dossierResult = await client.query(dossierQuery, [
        "finie",
        dossierId,
      ]);

      await client.query("COMMIT"); // Commit transaction
      return {
        pv: { id, status: "valide" },
        dossier: dossierResult.rows[0],
      };
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback on error
      console.error("Error updating PV and Dossier:", error);
      throw error;
    } finally {
      client.release();
    }
  },
  updatePVreject: async (id, reserve) => {
    try {
      const status = "rejete";
      //  console.log(reserve);
      const query = `
                UPDATE pv 
                SET 
                  etat_pv = $1,
                  reserve  = $2
                WHERE id_pv = $3
                RETURNING *
            `;
      const result = await pool.query(query, [status, reserve, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error updating PV:", error);
      throw error;
    }
  },

  // Delete PV
  deletePV: async (id) => {
    try {
      const query = `
                DELETE FROM pv 
                WHERE id_pv = $1
                RETURNING id_pv
            `;
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting PV:", error);
      throw error;
    }
  },
};
export default pvService;