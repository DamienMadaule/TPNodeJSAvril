const app = express();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const pug = require('pug');
const methodOverride = require('method-override');
const session = require('express-session');
const db = require('./db');

app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(session({
    secret: 'keyboard cat',
    userId:null
}));
app.use(express.static(path.join(__dirname, "public")));

app.all('*', (req, res, next) => {
    next();
});

app.use('/todos', require('./controllers/todos'));

app.use('/users', require('./controllers/users'));

app.use((req, res) => {
    res.send(404, '404, Page Introuvable');
});
app.listen(PORT);