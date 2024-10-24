const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const route = require('./route');

const app = express();


mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB Connected Successfuly')
}).catch((err) => {
  console.log(err)
});;


app.set("view engine", "ejs");
//Global Variable
global.userIN = null;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static("public"));

app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })

  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(methodOverride('_method', {
  methods: ['POST', 'GET', 'DELETE']
}));


//Middlewares
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})


app.use('/', route);




const port = 8000;
app.listen(port, () => {

  console.log(`Uygulama ${port} nolu port üzerinden başlatıldı!`);
});