(function(){
    var express=require('express');
    var bodyParser=require('body-parser');
    var morgan=require('morgan');
    var mysql=require('mysql');
    var cors=require('cors');
    var path=require('path');
    var puerto=3001;
    var modelo = require('./models');
    var app=express();
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api/v1',require('./route')(modelo));

    modelo.sequelize.sync().then(function(){
        app.listen(puerto,function(){
            console.log("Servidor iniciado en el puerto: "+puerto);
        });
    });
})();
