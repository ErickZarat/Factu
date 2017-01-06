(function(){
    var express=require('express');
    var bodyParser=require('body-parser');
    var morgan=require('morgan');
    var mysql=require('mysql');
    var cors=require('cors');

    var puerto=3001;
    var app=express();
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api/v1',require('./route'));

        app.listen(puerto,function(){
            console.log("Servidor iniciado en el puerto: "+puerto);
        });
})();
