const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ArticleSchema = new schema({
    title: String,
    body: String,
    numberOfLikes: Number
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;