const mongoose = require('mongoose');

const article_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
    },
    reviews: {
        type: Number
    }
})

const ArticleModel = mongoose.model('Articles', article_schema)
module.exports = ArticleModel;