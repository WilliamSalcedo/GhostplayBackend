const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * Ruta para registrar un nuevo usuario
 * Se espera un objeto JSON con: username y password
 */
router.post("/register", async (req, res) => {
    const { username, email, password, favoriteConsole } = req.body;

    // Validación básica
    if (!username || !email || !password || !favoriteConsole) {
        return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        return res.status(409).json({ message: "El usuario ya está registrado." });
    }

    // Crear nuevo usuario
    const newUser = new User({ username, email, password, favoriteConsole });
    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "✅ Usuario registrado exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al registrar el usuario.", error });
    }
});

/**
 * Ruta para iniciar sesión
 * Se espera un objeto JSON con: username y password
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "❌ Usuario o contraseña incorrectos." });
    }

    // Autenticación exitosa
    res.json({ message: "✅ Autenticación satisfactoria." });
});

module.exports = router;
