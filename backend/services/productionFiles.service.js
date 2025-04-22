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
     const result = await pool.query("SELECT * FROM fiche_production");
     return result.rows;
   },

   // Get single client by ID
   getProductionFileById: async (id) => {
     const result = await pool.query(
       "SELECT * FROM fiche_production WHERE id_fiche_production = $1",
       [id]
     );
     return result.rows[0];
   },

   // Create new client
   createProductionFile: async (data, selectedOrders) => {
     const { folder, shop } = data;
     const orders = selectedOrders;

     // Insert the folder and get the newly created dossier
     const fileResult = await pool.query(
       "INSERT INTO fiche_production (id_dossier,id_atelier) VALUES ($1,$2) RETURNING *",
       [folder, shop]
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
   updateProductionFile: async (id, clientData) => {
     const { name, email, phone } = clientData;
     const result = await pool.query(
       "UPDATE fiche_production  SET nom_client = $1, email_client = $2, tel_client = $3 WHERE id_client = $4 RETURNING *",
       [name, email, phone, id]
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
 };
export default productionFileService;
