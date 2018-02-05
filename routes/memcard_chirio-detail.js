var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

/*requestPromise("http://www.roadrunnersports.com/rrs/mensshoes/mensshoesrunning/?p=96", function (error, response, body) {*/

var str = '집밥 레시피'
var qs = require('querystring');

var encodedStr = qs.escape(str);


var res = syncRequest('post', 'http://mecard.sonokong.co.kr/Card/CardView?crd_idx=1600');


var $ = cheerio.load(res.getBody());

var blogListJson = new Array()

var count = '';
$('.card_info  >dl > dd ').each(function () {

    var content = $(this).children().text()


    blogListJson.push({

        content: content,

    })

});

$('.cards_pop_t   ').each(function () {

    var img = $(this).find('img').attr('src');


    console.log('############' + img);

});


console.log(blogListJson);
console.log("###" + blogListJson.length);

