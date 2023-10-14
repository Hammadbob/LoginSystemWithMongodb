const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const router = require('./Router')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
//app.set('views', path.join(__dirname, 'Views/ClientSite'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: uuidv4(),
    saveUninitialized: true,
    resave: false
}));

app.use('/route', router);

app.get('/', (req, res) => {
    res.render('Index', { title: 'Login System' });
})
app.get('/login', (req, res) => {
    res.render('Login', { title: 'Login System' });
})

app.get('/register', (req, res) => {
    res.render('Register', { title: 'Register System' });
})

app.get('/dashboard', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log('listening on server http://localhost:3000')
});