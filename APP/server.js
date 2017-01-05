/*
 * Author : ErickZarat
*/
var express		  =	require('express');
var session		  =	require('express-session');
var bodyParser  = require('body-parser');
var app			    =	express();

//setting ejs engine, for views
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//setting session params
// SECRET: $h@k3Tr3nd
app.use(session({secret: 'aa68852f213c0b7ddeccd80821e212ac',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var usrSession;

app.get('/',function(req,res){
	usrSession=req.session;
	if(usrSession.email)
	{
		res.redirect('/admin');
	}
	else{
	res.render('index.html');
	}
});

app.get('/facturas', function(req, res){
	res.render('facturas.html');
});

app.get('/productos', function(req, res){
	res.render('productos.html');
});

app.get('/clientes', function(req, res){
	res.render('clientes.html');
});

app.get('/usuarios', function(req, res){
	res.render('usuarios.html');
});

app.get('/configuracion', function(req, res){
	res.render('configuracion.html');
});

app.get('/salir', function(req, res){
	res.render('index.html');
});

app.post('/login',function(req,res){
	usrSession=req.session;
	usrSession.email=req.body.email;
	res.end('done');
});

app.get('/admin',function(req,res){
	usrSession=req.session;
	if(usrSession.email)
	{
		res.write('<h1>Hello '+usrSession.email+'</h1><br>');
		res.end('<a href='+'/logout'+'>Logout</a>');
	}
	else
	{
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/'+'>Login</a>');
		res.redirect('/');
	}

});

app.get('/logout',function(req,res){

	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});
app.listen(3000,function(){
	console.log("App Started on PORT 3000");
});
