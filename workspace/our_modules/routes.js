const express = require('express');
const mysql = require("mysql");
const http = require('http');

//var conn = mysql.createConnection("mysql://admin:YGYLISWGYXXGQRPO@sl-eu-lon-2-portal.2.dblayer.com:17719/compose"); example
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'lorenzo0100',
  password : '',
  database : 'BOGGIDB'
});

var DBOK = false;
conn.connect((err) => {
  if(!err){
    console.log("Database connected");
    DBOK = true;
  }
  else
    console.log("Error, Database not connected");
});
var router = express.Router();

//------------------------------------------------------------------------------

//LOGGER FOR PAGE REQUESTED
router.get('*', (req, res, next) => {
  console.log('Richiesta all\'uri: ' + req.url);
  next();
});

//------------------------------------------------------------------------------

//PAGES

//CALL ANGULAR
router.get('/', (req, res) => {
  console.log('Renderizzazione view: index');
  res.sendFile('index.html');
});


//------------------------------------------------------------------------------

//API
router.use((req, res, next) => {
    if(!DBOK){
      console.log('DB error, can\'t call the API ' + req.url);
      return res.send({result: '\'Attualmente non è possibile accedere al servizio cercato.\''}); 
    }
    next(); 
});


//GET ALL USERS
router.get('/api/v1/user/:email', (req, res, next) => {
  var options = {
    host: "portal2.boggi.com",
    port: 8080,
    path: '/rest/v1/hackaton/GetUserDataFromEmail?email=' + req.params.email,
  };
  
  var callback = (response) => {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });
  
    response.on('end', function () {
      console.log('Data obtained from ' + options.host);
      res.send(JSON.parse(str));
    });
  };
  
  console.log('API called to ' + options.host);
  var request = http.request(options, callback);
  request.end();
});

//GET ALL SOCIAL NETWORK IN DB
router.get('/api/social', (req, res, next) => {
  if(!DBOK) return res.render('result', {result: '\'Attualmente non è possibile accedere al servizio cercato.\''});
  conn.query('select * from social', (err, rows) => {
    if(err) return next(err);
    res.send({result: JSON.stringify(rows)});
  });
});

router.get('/api/instagram/:username', (req, res, next) => {
  
});

//------------------------------------------------------------------------------

//ERROR 404 NOT FOUND URI FOR DESTINATION PAGE
router.get('*', (req, res, next) => {
  var err = new Error();
  err.status = 404;
  err.description = 'Page not Found!';
  err.message = 'Nessuna pagina presente qui!';
  next(err);
});

//------------------------------------------------------------------------------
//EXPORTS THE MODULE ROUTER
module.exports = router;