/*
 * Author : ErickZarat
*/
var express		  =	require('express');
var session		  =	require('express-session');
var bodyParser  = require('body-parser');
var path  = require('path');
var cors = require('cors');
var app			    =	express();

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

var usrSession;


app.get('/',function(req,res){
	if(req.session.usr){ res.render('facturas.html'); }
	else{ res.render('index.html'); }
});


app.get('/facturas', function(req, res){
	if(req.session.usr){ res.render('facturas.html'); }
	else{ res.redirect('/'); }
});

app.get('/agregarfactura', function(req, res){
	if(req.session.usr){ res.render('agregarfactura.html'); }
	else{ res.redirect('/'); }
});

app.get('/productos', function(req, res){
	if(req.session.usr){ res.render('productos.html'); }
	else{ res.redirect('/'); }
});

app.get('/clientes', function(req, res){
	if(req.session.usr){ res.render('clientes.html'); }
	else{ res.redirect('/'); }
});

app.get('/usuarios', function(req, res){
	if(req.session.usr){ res.render('usuarios.html'); }
	else{ res.redirect('/'); }
});

app.get('/configuracion', function(req, res){
	if(req.session.usr){ res.render('configuracion.html'); }
	else{ res.redirect('/'); }
});

app.get('/cajachica', function(req, res){
	if(req.session.usr){ res.render('cajaChica.html'); }
	else{ res.redirect('/'); }
});

app.post('/session',function(req,res){
	usrSession=req.session;
	usrSession.name=req.body.nombre;
	usrSession.usr=req.body.username;
	usrSession.email=req.body.email;
	res.redirect('/facturas');
});


app.get('/logout',function(req,res){

	req.session.destroy(function(err){
		if(err){ console.log(err); }
		else { res.redirect('/'); }
	});

});
app.listen(3000,function(){
	console.log("App Started on PORT 3000");
});
