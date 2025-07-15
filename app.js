require('dotenv').config();
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
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a la BD:", err));
  

// Escuchar peticiones
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

