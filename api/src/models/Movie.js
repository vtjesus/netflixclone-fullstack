const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: String
    },
    duration: {
        type: String
    },
    classification: {
        type: Number
    },
    genre: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    title_img: {
        type: String
    },
    thumbnail: {
        type: String
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema)