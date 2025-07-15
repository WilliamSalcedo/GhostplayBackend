const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//  Crear un post
router.post("/", async (req, res) => {
    const { title, description, author, category, game } = req.body;

    // Validación básica
    if (!title || !description) {
        return res.status(400).json({ message: "Título y descripción son obligatorios." });
    }

    const post = new Post({
        title,
        description,
        author: author || 'Anónimo',
        category: category || 'General',
        game: game || 'General'
    });

    try {
        const savedPost = await post.save();
        res.status(201).json({
            message: "✅ Post creado exitosamente",
            post: savedPost
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al crear el post.", error: error.message });
    }
});

//  Obtener todos los posts
router.get("/", async (req, res) => {
    try {
        const { category, game, author } = req.query;
        let filter = {};

        // Filtros opcionales
        if (category) filter.category = category;
        if (game) filter.game = game;
        if (author) filter.author = author;

        const posts = await Post.find(filter).sort({ date: -1 });
        
        res.json({
            message: "✅ Posts obtenidos exitosamente",
            count: posts.length,
            posts: posts
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al obtener los posts.", error: error.message });
    }
});

//  Obtener un post por ID
router.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "❌ Post no encontrado" });
        
        res.json({
            message: "✅ Post obtenido exitosamente",
            post: post
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al obtener el post.", error: error.message });
    }
});

// Eliminar un post
router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!removedPost) return res.status(404).json({ message: "Post no encontrado" });
        res.json({ message: "Post eliminado con éxito", removedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Actualizar un post
router.patch("/:postId", async (req, res) => {
    try {
        const updateData = {};
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.author) updateData.author = req.body.author;
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.game) updateData.game = req.body.game;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: updateData },
            { new: true, runValidators: false } // runValidators: false para permitir actualizar posts antiguos
        );

        if (!updatedPost) return res.status(404).json({ message: "❌ Post no encontrado" });
        res.json({
            message: "✅ Post actualizado exitosamente",
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al actualizar el post.", error: error.message });
    }
});

//  Agregar comentario a un post
router.post("/:postId/comments", async (req, res) => {
    try {
        const { username, content } = req.body;

        // Validación básica
        if (!username || !content) {
            return res.status(400).json({ message: "❌ Username y contenido son obligatorios." });
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "❌ Post no encontrado" });
        }

        // Agregar el comentario
        post.comments.push({
            username,
            content,
            date: new Date()
        });

        const savedPost = await post.save();

        res.status(201).json({
            message: "✅ Comentario agregado exitosamente",
            comment: savedPost.comments[savedPost.comments.length - 1],
            post: savedPost
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al agregar el comentario.", error: error.message });
    }
});

//  Obtener comentarios de un post
router.get("/:postId/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "❌ Post no encontrado" });
        }

        res.json({
            message: "✅ Comentarios obtenidos exitosamente",
            count: post.comments.length,
            comments: post.comments
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al obtener los comentarios.", error: error.message });
    }
});

//  Dar like a un post
router.post("/:postId/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "❌ Post no encontrado" });
        }

        post.likes += 1;
        const savedPost = await post.save();

        res.json({
            message: "✅ Like agregado exitosamente",
            likes: savedPost.likes,
            post: savedPost
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Error al dar like.", error: error.message });
    }
});

module.exports = router;


