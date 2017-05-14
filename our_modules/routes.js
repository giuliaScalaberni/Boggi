const express = require('express');
const http = require('http');
const fs = require('fs'); //FileStream

//WATSON
const watson = require('watson-developer-cloud');
var visual_recognition = watson.visual_recognition({
  api_key: 'f60edd5ed1307e2872c39a45e8d9a9a52fbfc7ec',
  version: 'v3',
  version_date: '2016-05-20'
});

//SOCIAL
const twitter = require('twitter');
var instagramClient = require('instagram-node').instagram();

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

//CALL ANGULAR
router.get('/', (req, res) => {
  console.log('Renderizzazione view: index');
  res.sendFile('index.html');
});


//------------------------------------------------------------------------------

//APIfunction

//GET ALL USERS
router.get('/api/v1/user/:email', (req, res, next) => {

  if(req.params.email == 'TIZIANO.FERRO@GMAIL.COM'){
    res.send(
      {"DemandwareCustomer":{"Version":"16.9","Type":"customer","ResourceState":"24d330fec15ef0464e322a0c13cbdd0a27afa68dc74868cef8f32c2b32fc1aaf","CreationDate":"2016-07-30T15:31:30.000Z","Credentials":{"Type":"credentials","Enabled":true,"Locked":false,"Login":"TIZIANO.FERRO@GMAIL.COM"},"CustomerID":"bcORczLMlYZ8oDI3kPtUima0yT","CustomerNumber":"000099016","Email":"TIZIANO.FERRO@GMAIL.COM","FirstName":"TIZIANO","Gender":1,"LastLoginTime":null,"LastName":"FERRO","LastVisitTime":null,"PreviousLoginTime":null,"PreviousVisitTime":null,"OmnichannelReady":false,"Points":237,"Discount":0,"DicountType":"P","RetailID":"53407","MobilePhone":"335 6266179","HomePhone":null,"Birthday":"1962-01-11","Authorization":null},"Orders":[{"CostoImballo":0,"CostoDazio":0,"ID":41640,"NumOrdine":"WEBD00200849","OrdineOriginale":"","DataOrdine":"\/Date(1494680264000)\/","DataIngressoSistema":"\/Date(1494685102000)\/","FDenominazione":"TIZIANO FERRO","FRagioneSociale":"","FIndirizzo":"VIA TEANO 21","FIndirizzo2":"NULL","FCAP":"20161","FComune":"MILANO","FProvincia":"MILANO","Femail":"TIZIANO.FERRO@GMAIL.COM","FTelefono":"335 6266179","FCodFiscale":"","FPartitaIVA":"","SDenominazione":"TIZIANO FERRO","SRagioneSociale":"","SIndirizzo":"Boggi Street","SIndirizzo2":"Piazza San Babila 3","SCAP":"20122","SComune":"Milano","SProvincia":"Milano","Semail":"TIZIANO.FERRO@GMAIL.COM","STelefono":"0039 02 760 003 66","SCodFiscale":"","SPartitaIVA":"","CodAutorizzazione":"4514946803111521","TipoPagamento":"POS","OrderType":1000,"Messaggio":"","CostoSpedizione":0,"TimeStamp":"\/Date(1494690675000)\/","OrderStatus":6,"UserID":"000099016","Lastdatamodified_wb":"\/Date(1494680264000)\/","FCodisoNaz":"IT","SCodisoNaz":"IT","NumFatt":"","PesoOrdine":0.39,"ColliOrdine":1,"UsedCoupons":"","Totale":79,"Sconto":0,"TotaleScontato":79,"Language":"en_US","AreaCode":"","CodCampagna":"","OrdineRegalo":"False","ValutatoPerNC":0,"RichiestaFattura":"N","Guest":"N","CouponCodeDetail":{"CouponCodeName":"","Value":"0","Type":"","IsDirty":false,"IsFlagForDelete":false},"OrderBoggiItems":[{"ID":95673,"IDTestata":"WEBD00200849","NumRiga":1,"CodArticolo":"BO17P048901","Taglia":"40","Quantita":1,"QuantitaFatturata":0,"Prezzo":79,"OrderStatus":6,"UserID":"000099016","LastDataModified_wb":"\/Date(1494680264000)\/","DescrizioneArt":"CAMICIA IN COTONE POPELINE STRETCH E COLLO TOKYO (PICCOLO) CUSTOM FIT","VoceDoganale":"62052000  ","MadeIn":"RO","Composizione":"78 CO 18 PA 4 EA","GiftCardCode":"","Omaggio":0,"PrezzoAcquisto":79,"LastSeason":"17P","GroupCode":11,"GroupDescription":"Camicie Classiche","PrezzoScontato":0,"PrezzoAcquistoScontato":0,"ScontoPrezzo":0,"ScontoPrezzoAcquisto":0,"PrezzoEUR":79,"IsVirtualItem":false,"DiscountLabel":"","DiscountValue":0,"DiscountValueEUR":0,"WarehouseAvailability":0,"IsDirty":false,"IsFlagForDelete":false}],"ShippingFees":0,"ScontoTestata":0,"Currency":"EUR","CaptureConfirmation":"","CaptureDate":"\/Date(-62135596800000)\/","RemoteHost":"89.96.88.242","CostoSpedizioneEur":0,"TotaleEur":79,"ScontoEur":0,"TotaleScontatoEur":79,"GiftCardFee":0,"GiftCardFeeEur":0,"SourceID":1,"MasterOrder":"0","OrderBoggiAttribute":[{"ID":2272359,"NumOrdine":"WEBD00200849","AttributeKey":"Demandware customer number","AttributeValue":"000099016","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":10,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272360,"NumOrdine":"WEBD00200849","AttributeKey":"Demandware customer ID","AttributeValue":"bcORczLMlYZ8oDI3kPtUima0yT","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":10,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272361,"NumOrdine":"WEBD00200849","AttributeKey":"Demandware customer Firstname","AttributeValue":"TIZIANO","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":10,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272362,"NumOrdine":"WEBD00200849","AttributeKey":"Demandware customer Lastname","AttributeValue":"FERRO","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":10,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272363,"NumOrdine":"WEBD00200849","AttributeKey":"Demandware customer Creation date","AttributeValue":"2016-07-30T15:31:30.000Z","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":10,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272364,"NumOrdine":"WEBD00200849","AttributeKey":"acceptingSalesConditions","AttributeValue":"false","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":6,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272365,"NumOrdine":"WEBD00200849","AttributeKey":"eaEmployeeId","AttributeValue":"1083","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":6,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272366,"NumOrdine":"WEBD00200849","AttributeKey":"eaStoreId","AttributeValue":"1001","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":6,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272367,"NumOrdine":"WEBD00200849","AttributeKey":"privacyPolicy","AttributeValue":"false","EventDate":"\/Date(1494685101000)\/","OrderBoggiAttributeType":6,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272368,"NumOrdine":"WEBD00200849","AttributeKey":"ConversionRate","AttributeValue":"1","EventDate":"\/Date(1494685102000)\/","OrderBoggiAttributeType":1,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272369,"NumOrdine":"WEBD00200849","AttributeKey":"TimeZone","AttributeValue":"Europe/Rome","EventDate":"\/Date(1494685102000)\/","OrderBoggiAttributeType":11,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272370,"NumOrdine":"WEBD00200849","AttributeKey":"TimeZoneOffSet","AttributeValue":"3600","EventDate":"\/Date(1494685102000)\/","OrderBoggiAttributeType":11,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272371,"NumOrdine":"WEBD00200849","AttributeKey":"TimeZoneJson","AttributeValue":"{\"as\":\"AS12874 Fastweb\",\"city\":\"MuggiÃ²\",\"country\":\"Italy\",\"countryCode\":\"IT\",\"isp\":\"Fastweb\",\"lat\":45.5888,\"lon\":9.2278,\"org\":\"Fastweb\",\"query\":\"89.96.88.242\",\"region\":\"25\",\"regionName\":\"Lombardy\",\"status\":\"success\",\"timezone\":\"Europe/Rome\",\"zip\":\"20835\"}","EventDate":"\/Date(1494685102000)\/","OrderBoggiAttributeType":11,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272372,"NumOrdine":"WEBD00200849","AttributeKey":"Latitude","AttributeValue":"45.4654219","EventDate":"\/Date(1494685104000)\/","OrderBoggiAttributeType":12,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false},{"ID":2272373,"NumOrdine":"WEBD00200849","AttributeKey":"Longitude","AttributeValue":"9.1859243","EventDate":"\/Date(1494685104000)\/","OrderBoggiAttributeType":12,"OrderBoggiAttributeDetails":null,"IsDirty":false,"IsFlagForDelete":false}],"OrderBoggiPaymentCapture":[],"Payments":null,"CreditNotes":[],"ReturnCases":[],"NavisionInvoices":null,"ShopUpsellings":null,"TrackingUrl":[" "],"Boxes":[],"SDenominazioneOriginale":"TIZIANO FERRO","SIndirizzoOriginale":"Boggi Street","SIndirizzo2Originale":"Piazza San Babila 3","SCapOriginale":"20122","SComuneOriginale":"Milano","SProvinciaOriginale":"Milano","TotaleScontoTestata":0,"TotaleScontoTestata_EUR":0,"CourierName":"BARTOLINI","OrchestrationList":[],"CourierEventList":[],"OrderFilesList":[],"NavisionInvoice":"0","IsDirty":false,"IsFlagForDelete":false}]}
    );
  }else{

    var options = {

      host: "portal2.boggi.com",
      port: 8080,
      path: '/rest/v1/hackaton/GetUserDataFromEmail?email=' + req.params.email,

      /*
      path: '/js/controller/customer.json',
      port: 3000
      */
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
  }
});

router.get('/api/instagram/:username', (req, res, next) => {
  res.send({result: 400});
});

router.get('/api/twitter/:query', (req, res) => {
  var params = {q: req.params.query};
  twitterClient.get('users/search', params, function(error, tweets, response) {
    if (!error) {
      res.send(tweets);
    }
  });
});

router.get('/api/watson', (req, res) => {
  var params = {
    images_file: req.body.data
  };
  visual_recognition.classify(params, (errWatson, resWatson) => {
    console.log('Data retrived by Visual Recognition of Watson');
    if (errWatson)
      res.send(errWatson);
    else
      res.send(JSON.stringify(resWatson, null, 2));
  });

/*
    var file = fs.createWriteStream(req.params.codeProduct + '.png');
    var request = http.get('http://storage.googleapis.com/gweb-uniblog-publish-prod/static/blog/images/google-200x200.7714256da16f.png', function(response) {
      response.pipe(file);
  });
*/
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
