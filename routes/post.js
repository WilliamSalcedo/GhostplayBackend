const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//  Crear un post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Obtener un post por ID
router.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: { title: req.body.title } },
            { new: true } // Retorna el objeto actualizado
        );

        if (!updatedPost) return res.status(404).json({ message: "Post no encontrado" });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


