var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

/*requestPromise("http://www.roadrunnersports.com/rrs/mensshoes/mensshoesrunning/?p=96", function (error, response, body) {*/

var str = '집밥 백선생 레시피 모음'
var qs = require('querystring');

var encodedStr = qs.escape(str);


var res = syncRequest('get', 'http://krtiptiptip.tistory.com/716');
var $ = cheerio.load(res.getBody());
var image = $('.imageblock').first().children().attr('src');



console.log(image);
//console.log("###" + imageListJson.length);





