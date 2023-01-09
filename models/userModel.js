const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,'UserName Must be provided'],
        unique : true,
    },
    password:{
        type:String,
        required: [true,'Password Must be provided'],
    }})

const User = mongoose.model("User",userSchema);
module.exports = User; 