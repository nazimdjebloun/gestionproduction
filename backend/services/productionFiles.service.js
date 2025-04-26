// services/client.service.js
import pool from "../config/db.js"; // PostgreSQL pool

// table client
// id_client
// nom_client
// email_client
// tel_client
// adresse_client

 const productionFileService = {
   // Get all clients
   getAllProductionFiles: async () => {
     const query = `
SELECT 
  fp.*,
  c.nom_client,
  a.nom_atelier,
  dep.nom_departement,
  d.num_bc,
  d.date_creation AS date_creation_dossier
FROM fiche_production fp
JOIN dossier d ON fp.id_dossier = d.id_dossier
JOIN client c ON d.id_client = c.id_client
JOIN atelier a ON fp.id_atelier = a.id_atelier
JOIN departement dep ON d.id_departement = dep.id_departement
WHERE d.etat_dossier IN ('encours', 'entraitement')
`;
     //  const result = await pool.query("SELECT * FROM fiche_production");
     const result = await pool.query(query);
     return result.rows;
   },

   // Get single client by ID
   getProductionFileById: async (id) => {
     const query = `SELECT 
  fp.*,
  c.nom_client,
  a.nom_atelier,
  dep.nom_departement,
  d.num_bc,
  d.date_creation AS date_creation_dossier
FROM fiche_production fp
JOIN dossier d ON fp.id_dossier = d.id_dossier
JOIN client c ON d.id_client = c.id_client
JOIN atelier a ON fp.id_atelier = a.id_atelier
JOIN departement dep ON d.id_departement = dep.id_departement
WHERE fp.id_fiche_production = $1;
`;
     const result = await pool.query(query, [id]);
     return result.rows[0];
   },
   getProductionFileByFolderId: async (id) => {
     const query = `SELECT 
  fp.*,
  c.nom_client,
  a.nom_atelier,
  dep.nom_departement,
  d.num_bc,
  d.date_creation AS date_creation_dossier
FROM fiche_production fp
JOIN dossier d ON fp.id_dossier = d.id_dossier
JOIN client c ON d.id_client = c.id_client
JOIN atelier a ON fp.id_atelier = a.id_atelier
JOIN departement dep ON d.id_departement = dep.id_departement
WHERE fp.id_dossier = $1;
`;
     const result = await pool.query(query, [id]);
     return result.rows;
   },
   getAllProductsByProductionFile: async (ficheProductionId) => {
     try {
       // Query to get products through commande_fiche -> detail_commande -> produit
       const query = `
            SELECT 
                p.id_produit,
                p.designation_produit,
                p.description_produit,
                tp.designation_type_produit,
                dc.quantite,
                dc.largeur,
                dc.epaisseur,
                dc.details,
                dc.id_detail_commande
            FROM produit p
            JOIN type_produit tp ON p.id_type_produit = tp.id_type_produit
            JOIN detail_commande dc ON p.id_produit = dc.id_produit
            JOIN commande_fiche cf ON dc.id_detail_commande = cf.id_detail_commande
            WHERE cf.id_fiche_production = $1
        `;

       const result = await pool.query(query, [ficheProductionId]);

       return result.rows;
     } catch (error) {
       console.error("Error fetching products for fiche production:", error);
       throw error;
     }
   },

   // Create new client
   createProductionFile: async (data, selectedOrders) => {
     const { folder, shop } = data;
     const orders = selectedOrders;
     const etat_dossier = "encours";

     // Insert the folder and get the newly created dossier
     const fileResult = await pool.query(
       "INSERT INTO fiche_production (id_dossier,id_atelier) VALUES ($1,$2) RETURNING *",
       [folder, shop]
     );
     const FolderResult = await pool.query(
       "UPDATE dossier  SET etat_dossier = $1 WHERE id_dossier = $2 RETURNING *",
       [etat_dossier, folder]
     );
     const file = fileResult.rows[0];
     const id_file = file.id_fiche_production;
     console.log("Created file:", file);
     // Insert each product into detail_commande
     const insertResults = await Promise.all(
       orders.map((order) =>
         pool.query(
           `INSERT INTO commande_fiche
          (id_fiche_production, id_detail_commande) 
         VALUES ($1, $2) 
         RETURNING *`,
           [id_file, order.id_detail_commande]
         )
       )
     );

     console.log(
       "Inserted details:",
       insertResults.map((r) => r.rows[0])
     );
     console.log("Created file:", file);

     return file;
   },

   // Update client
   updateProductionFile: async (id, hours, folder) => {
     const etat = "finie";
     const etat_dossier = "encours";
     console.log(folder);
     console.log(id);
     console.log(hours);

     const result = await pool.query(
       "UPDATE fiche_production  SET total_heurs = $1, etat_fiche = $2 WHERE id_fiche_production = $3 RETURNING *",
       [hours, etat, id]
     );

     const result_dossier = await pool.query(
       "UPDATE dossier  SET etat_dossier = $1 WHERE id_dossier = $2 RETURNING *",
       [etat_dossier, folder]
     );
     return result.rows[0];
   },

   // Delete client
   deleteProductionFile: async (id) => {
     const result = await pool.query(
       "DELETE FROM fiche_production  WHERE id_fiche_production  = $1 RETURNING *",
       [id]
     );
     return result.rows[0];
   },

   //  employesProductionFile: async (id) => {
   //    const employes = selectedEmployes;
   //    const insertEmployes = await Promise.all(
   //      employes.map((employe) =>
   //        pool.query(
   //          `INSERT INTO travaille
   //         (id_fiche_production, id_employe)
   //        VALUES ($1, $2)
   //        RETURNING *`,
   //          [id, employe.id_employe]
   //        )
   //      )
   //    );

   //    return insertEmployes.rows;
   //  },
   employesProductionFile: async (id, selectedEmployes) => {
     const insertedRows = [];

     for (const employe of selectedEmployes) {
       const result = await pool.query(
         `INSERT INTO travaille
        (id_fiche_production, id_employe)
       VALUES ($1, $2)
       ON CONFLICT (id_fiche_production, id_employe) DO NOTHING
       RETURNING *`,
         [id, employe.id_employe]
       );

       if (result.rows.length > 0) {
         insertedRows.push(result.rows[0]);
       }
     }

     return insertedRows;
   },

   //  materialsProductionFile: async (id, selectedMateriels) => {
   //    const materiels = selectedMateriels;

   //    const insertMaterials = await Promise.all(
   //      materiels.map((materiel) =>
   //        pool.query(
   //          `INSERT INTO matiere_utilise
   //         (id_fiche_production, id_matiere,quantite)
   //        VALUES ($1, $2,$3)
   //        RETURNING *`,
   //          [id, materiel.id_matiere, materiel.quantity]
   //        )
   //      )
   //    );

   //    return insertMaterials.rows;
   //  },
   materialsProductionFile: async (id, selectedMateriels) => {
     const insertedRows = [];

     for (const materiel of selectedMateriels) {
       const result = await pool.query(
         `INSERT INTO matiere_utilise
        (id_fiche_production, id_matiere, quantite) 
       VALUES ($1, $2, $3)
       ON CONFLICT (id_fiche_production, id_matiere) DO NOTHING
       RETURNING *`,
         [id, materiel.id_matiere, materiel.quantity]
       );

       if (result.rows.length > 0) {
         insertedRows.push(result.rows[0]);
       }
     }

     return insertedRows;
   },
 };
export default productionFileService;
