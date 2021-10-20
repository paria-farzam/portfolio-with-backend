if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require("express");
const app = express();
const index = require("./index");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
let session = require('express-session');

//config session
var sess = {
  secret: process.env.SECRET,
  resave: false,
  maxAge : 1000*60*60*30,
  saveUninitialized: true,
  cookie: { secure : true }
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017");
mongoose.Promise = global.Promise;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/portfolio", index);

app.listen(process.env.PORT, ()=>{
  console.log(`i'm at port ${process.env.PORT}`);
});