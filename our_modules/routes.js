const express = require('express');
const http = require('http');
const twitter = require('twitter');

var twitterClient = new twitter({
  consumer_key: '9VK1qhOGxWPdeLEynP0RaLmQu',
  consumer_secret: '1mH1zMUlFu8KAYKRy3AgUz2ECysEpVQQgfB3xCp6BbW30ZcaBp',
  access_token_key: '828367255079645185-gTJ7UbV1VvQQ8z91ZfugBo6Ht5EoV02',
  access_token_secret: 'v3SwPVh3anLVGmVibNPNAn01khaJMNKcwLWvujgDFjuiH'
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

router.get('/twitterTest', (req, res) => {
  var params = {q: 'edoardo bonanni'};
  twitterClient.get('users/search', params, function(error, tweets, response) {
    if (!error) {
      res.send(tweets);
    }
  });
});

//CALL ANGULAR
router.get('/', (req, res) => {
  console.log('Renderizzazione view: index');
  res.sendFile('index.html');
});


//------------------------------------------------------------------------------

//APIfunction

//GET ALL USERS
router.get('/api/v1/user/:email', (req, res, next) => {
  var options = {
    host: "portal2.boggi.com",
    port: 8080,
    path: '/rest/v1/hackaton/GetUserDataFromEmail?email=' + req.params.email,
  };
  
  var callback = (response) => {
    var str = '';
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

router.get('/api/instagram/:username', (req, res, next) => {
  res.send({result: 400});
});

//------------------------------------------------------------------------------

//ERROR 404 NOT FOUND URI FOR DESTINATION PAGE
router.get('*', (req, res, next) => {
  var err = new Error();
  err.status = 404;
  err.description = 'Page not Found!';
  err.message = 'Nothing here!';
  next(err);
});

//------------------------------------------------------------------------------
//EXPORTS THE MODULE ROUTER
module.exports = router;