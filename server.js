require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// establece la conexión con MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  
  password: "3312tiamu18",  
  database: "StayTrack",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    return;
  }
  console.log(" Conectado a MySQL ");
});

// Prueba
app.get("/", (req, res) => {
  res.send(" Servidor en ejecución...");
});

// Iniciando el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

