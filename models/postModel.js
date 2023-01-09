

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body:{
    type: String,
    required: [true, "Post must have body"],
  },
  title: {
    type: String,
    required: [true, "post must have title"],
  }
});
 
const Post = mongoose.model("Post", postSchema);
module.exports = Post;