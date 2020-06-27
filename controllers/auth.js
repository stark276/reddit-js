const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // SIGN UP FORM
  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });
  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });
  // SIGN UP POST
app.post("/sign-up", (req, res) => {
  // Create User and JWT
  const user = new User(req.body);
  const SECRET = process.env.SECRET
  console.log(SECRET)
  user
    .save().then((user) => {
      var token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: "60 days" });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
      })
    
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});
}

