import express from "express";
import clientRoutes  from"./routes/client.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/clients", clientRoutes);
app.listen(PORT, () => {
  console.log(` app running on port ${PORT}`);
});
