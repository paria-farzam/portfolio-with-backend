if (process.env.NODE_INV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3303;
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const index = require('./index');

app.set("view engine", "ejs");

//session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


//midlewares
app.use(express.static(__dirname + "/public", { redirect: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', index);


app.listen(PORT, () => {
  console.log(`im listening to ${PORT}`);
});