const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

 // INDEX
app.get("/", (req, res) => {
  var currentUser = req.user;
  console.log(currentUser);


  Post.find({})
    .then(posts => {
      res.render("posts-index", { posts, currentUser });
      console.log(currentUser);
    })
    .catch(err => {
      console.log(err.message);
    });
});

 // NEW
 app.get('/posts/new/', (req, res) => {
   res.render('posts-new', {});
 })
  // CREATE
  app.post('/posts/new/', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
   // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });
    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
      Post.find({
          subreddit: req.params.subreddit
        })
        .then(posts => {
          res.render("posts-index", {
            posts
          });
        })
        .catch(err => {
          console.log(err);
        });
    });


    
 //SEE EACH POST
app.get("/posts/:id", function (req, res) {
 // LOOK UP THE POST
 Post.findById(req.params.id).populate('comments').then((post) => {
   res.render('posts-show', {
     post
   });
 }).catch((err) => {
   console.log(err.message)
 })
});


};