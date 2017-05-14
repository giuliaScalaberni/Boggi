//Author: PROXYMA TEAM

//------------------------------------------------------------------------------

//GLOBAL VARIABLE
const DEVELOPMENT = true;
const port = process.env.PORT || 3000;

//IMPORT
const express = require('express'); //Express for server
const path = require('path'); //path constructor
var http = require('http');
//const fs = require('fs'); //FileStream
const bodyParser = require('body-parser');  //bodyParser of Express

//OUR IMPORT
var routes = require('./our_modules/routes');

//------------------------------------------------------------------------------

//EXPRESS() AND CONFIGURATION
var app = express();
app.use(bodyParser.json({uploadDir:'./tmpUpload'}));    //SET TEMPORARY UPLOAD FOLDER FILE
app.use(express.static('public'));  //SET THE PUBLIC FOLDER FOR IMPORT
app.use('/', routes);   //ACTIVATING ROUTING

//------------------------------------------------------------------------------

//ERROR HANDLERS
if(DEVELOPMENT){
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send({title: err.description || 'Something has went broke!', error: err.message});
        console.error(err.message + ': ' + req.url);
    });
}
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({title: err.description || 'Something has went broke!'});
    console.error(err.message + ': ' + req.url);
});


//------------------------------------------------------------------------------

//SERVER LISTEN
/*var server = */app.listen(port, () => {
   console.log(`Server running at port ${port}`);
});