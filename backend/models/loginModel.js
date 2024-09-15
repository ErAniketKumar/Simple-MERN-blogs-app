const mongoose = require("mongoose");
const loginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    }
});

const loginModel = mongoose.model("loginData",loginSchema);

module.exports = loginModel;