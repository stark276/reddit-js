const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
 content: {
  type: String,
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  required: true
 }
});

module.exports = mongoose.model("Comment", CommentSchema);