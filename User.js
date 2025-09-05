const mongoose = require("mongoose")
const { type } = require("os")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:2
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique: true,
        minlength:6
    }
});

module.exports = mongoose.model("User",userSchema)