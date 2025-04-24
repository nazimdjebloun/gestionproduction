import express from "express";
import clientRoutes from "./routes/clients.routes.js";
import productRoutes from "./routes/products.routes.js";
import clientfolderRoutes from "./routes/clientfolders.routes.js";
import productionFileRoutes from "./routes/productionfiles.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import shopsRoutes from "./routes/shops.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import employesRoutes from "./routes/employes.routes.js";
import materialsRoutes from "./routes/materials.routes.js";

import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clientfolders", clientfolderRoutes);
app.use("/api/productionfiles", productionFileRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/shops", shopsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/employes", employesRoutes);
app.use("/api/materials", materialsRoutes);
app.listen(PORT, () => {
  console.log(` app running on port ${PORT}`);
});
