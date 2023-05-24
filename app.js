
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require("./services/passportconf");
const app = express();
const cors = require('cors');

app.use(helmet());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});


const corsOptions = {
    origin: '*'
  }
app.use(cors(corsOptions));
app.use(expressValidator());

//database connection
require("./services/connection");

//import files
var publicRoutes = require("./routes/public");
var login = require("./routes/login");
var adminLogin = require('./routes/adminLogin');
var admin = require('./routes/admin');
var user = require('./routes/user');


//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport
app.use(passport.initialize());
app.use(passport.session());

//bind routes
app.use('/api/v1/public',publicRoutes);
app.use('/api/v1/login',login);
app.use('/api/v1/adminlogin',adminLogin);
app.use('/api/v1/admin',passport.authenticate('admin-token', {session:false}),admin);
app.use('/api/v1/user',passport.authenticate('user-token', {session:false}),user);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

//error handlings
app.use(function(req, res, next) {
    next(createError(404,"Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status).json({
        success : false,
        message : err.message
    });
});


module.exports = app;

