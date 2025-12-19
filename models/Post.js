const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: 'Anónimo'
    },
    category: {
        type: String,
        required: false,
        default: 'General',
        enum: ['General', 'Acción', 'RPG', 'Deportes', 'Estrategia', 'Aventura' ]
    },
    game: {
        type: String,
        default: 'General'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [CommentSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", PostSchema);
