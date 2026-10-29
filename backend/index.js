import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

