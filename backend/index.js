import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get(["/imagen/:busqueda", "/api/imagen/:busqueda"], async (req, res) => {
  try{
  const url = `https://images-api.nasa.gov/search?q=${req.params.busqueda}&media_type=image`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  const primero = datos.collection.items[0];
  res.json({
    titulo: primero.data[0].title,
    descripcion: primero.data[0].description,
    imagen: primero.links[0].href,
  });
 } catch(error){
  res.status(500).json({ error: "No se pudo obtener la imagen"});
}
});

app.get(["/verificar/:clave", "/api/verificar/:clave"], async (req, res) => {
  if(req.params.clave === process.env.CLAVE_SECRETA) {
    res.json({autorizado: true});
  } else {
    res.json({autorizado: false});
  }
});

if (!process.env.VERCEL) {
  app.listen(3000, () => {
   console.log("Servidor en http://localhost:3000");
  });
}

export default app;

