const express = require('express')

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
const expressValidator = require('express-validator');
const handlebars = require('handlebars');
require('dotenv').config();
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars),
});
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', hbs.engine);

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// Set db
require('./data/reddit-db');




app.listen(3000, () => {
 console.log('App listening on port 3000!')
})
module.exports = app;