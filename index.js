const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// DB models....
const Article = require('./models/Article');


// Connect to DB.....
const DBURL = 'mongodb+srv://asmaa:asmaa%4012345@cluster0.i5mz136.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DBURL)
    .then(() => {
        console.log('connected to DB successfully!!');
    }).catch((err) => {
        console.log('Failed to connect to DB!!!', err);
    })

// App setting....
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Set up multer for parsing form-data
const upload = multer(); // no storage = memory storage

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// End-points / routes....
app.get('/', (req, res) => {
    res.send('Hello World! Asmaa');
});

app.put('/add-post', (req, res) => {
    console.log('add post', req.body);
    res.send('Add New Post');
});

app.get('/show-numbers', (req, res) => {
    res.render('numbers', {
        name: 'Asmaa',
        numbers: Array.from({ length: 100 }, (_, i) => i + 1).join(', ')
    });
});

// ======= Article ENDPOINTS =========
app.post('/add-article', upload.none(), async (req, res) => {
    const newArticle = new Article();
    console.log('✌️req.body --->', req.body);

    const { title, body, numberOfLikes } = req.body;
    newArticle.title = title || 'Article';
    newArticle.body = body || 'This is the body of Article';
    newArticle.numberOfLikes = numberOfLikes || 0;

    await newArticle.save();
    res.json(newArticle);
});

app.get('/articles', async (req, res) => {
    const allArticles = await Article.find();

    res.json(allArticles);
});

app.get('/articles/:id', async (req, res) => {
    const { id } = req.params;
    const selectedArticle = await Article.findById(id);

    res.json(selectedArticle);
});

app.delete('/articles/:id', async (req, res) => {
    const { id } = req.params;
    const selectedArticle = await Article.findByIdAndDelete(id);

    res.json(selectedArticle);
});

app.get('/show-article', async (req, res) => {
    const allArticles = await Article.find();

    res.render('Articles.ejs', {
        name: 'Asmaa',
        articles: allArticles
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
