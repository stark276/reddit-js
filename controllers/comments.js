const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = function (app) {
 // CREATE Comment
 app.post("/posts/:postId/comments", function (req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
   .save()
   .then(comment => {
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
   })
   .catch(err => {
    console.log(err);
   });
 });

};