const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(bodyParser.json());

//  rutas
const authRoutes = require("./routes/auth");       // Rutas de login y register
app.use("/auth", authRoutes);


// Conexión a MongoDB
mongoose.connect("mongodb+srv://adminuser:admin123@cluster0.tgshhiw.mongodb.net/GhostPlay")
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error al conectar a la BD:", err));

// Escuchar peticiones
app.listen(3012, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3012");
});

