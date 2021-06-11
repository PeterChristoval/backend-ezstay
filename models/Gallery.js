const mongoose = require('mongoose')
const { Schema } = mongoose

const gallerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Gallery', gallerySchema)