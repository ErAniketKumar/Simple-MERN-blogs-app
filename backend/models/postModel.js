const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    authorName: {
        type: String,
    },
    heading: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true,
    },
    list: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true });

const postModel = mongoose.model("blogsData", postSchema);

module.exports = postModel;