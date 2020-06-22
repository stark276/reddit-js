var exphbs = require('express-handlebars');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

require('./controllers/posts.js')(app);
// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({
 defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Set db
require('./data/reddit-db');

var posts = [{
  title: "I am your first event",
  summary: "A great event that is super fun to look at and good",
  url: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn"
 },
 {
  title: "I am your second event",
  summary: "A great event that is super fun to look at and good",
  url: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn"
 },
 {
  title: "I am your third event",
  summary: "A great event that is super fun to look at and good",
  url: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn"
 }
]

// INDEX
app.get('/', (req, res) => {
 res.render('posts-index', {
  posts: posts
 });
})

// NEW
app.get('/posts/new', (req, res) => {
 res.render('posts-new', {});
})


app.listen(3000, () => {
 console.log('App listening on port 3000!')
})
