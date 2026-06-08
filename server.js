const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');

const app = express();
const PORT = 3000;

// Use ejs-mate for layout support
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'The Daily Faux - Home',
    headlines: [
      { id: 1, title: 'Local Cat Elected Mayor', summary: 'In a stunning upset...' },
      { id: 2, title: 'Scientists Discover Coffee is Now a Vegetable', summary: 'Breaking research...' },
      { id: 3, title: 'Moon Found to be Made of Cheese After All', summary: 'NASA confirms...' }
    ]
  });
});

app.get('/article/:id', (req, res) => {
  res.render('article', {
    title: 'The Daily Faux - Article',
    articleId: req.params.id
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'The Daily Faux - About' });
});

app.get('/subscribe', (req, res) => {
  res.render('sublandingpage', { title: 'The Daily Faux - About' });
});

app.get('/my-account', (req, res) => {
  res.render('myaccount', { title: 'The Daily Faux - About' });
});

app.listen(PORT, () => {
  console.log(`Faux news running at http://localhost:${PORT}`);
});