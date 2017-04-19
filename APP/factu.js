/*
* Author : ErickZarat
*/
var express		  =	require('express');
var session		  =	require('express-session');
var bodyParser  = require('body-parser');
var path  			= require('path');
var cors 				= require('cors');
var multer      = require('multer');
var app			    =	express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'fotoEmpresa');
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

//setting ejs engine, for views
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.use(cors());

//setting session params
// SECRET: $h@k3Tr3nd
app.use(session({secret: 'aa68852f213c0b7ddeccd80821e212ac',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
var routes = require('./route.js');
app.use('/',routes);

///// DEVELOPMENT CONFIG
/*app.listen(3000, function(){
  console.log('Listen on port: 3000');
});*/

///// PRODUCTION CONFIG
var port = process.env.PORT || 7000;
app.listen(port,function(){
console.log("App Started on PORT " + port);
});
