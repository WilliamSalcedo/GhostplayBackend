const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//  rutas
const authRoutes = require("./routes/auth");       // Rutas de login y register
app.use("/auth", authRoutes);


// Conexión a MongoDB
mongoose.connect("mongodb+srv://ghost_123:ghost123@cluster0.tgshhiw.mongodb.net/GhostPlay?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a la BD:", err));
  

// Escuchar peticiones
app.listen(3012, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3012");
});

