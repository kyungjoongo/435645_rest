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


var res = syncRequest('get', 'https://www.torrentmoa.com/159597');



var $ = cheerio.load(res.getBody());
var blogListJson = [];


$('.bubble').each(function () {

    var torrent= $(this).attr('href');

    console.log('################' + torrent);

});


$('.xe_content').each(function () {


    var image = $(this).children().children().attr('data-cfsrc')
    var image2 = $(this).children().children().next('noscript').html();



    blogListJson.push({
        image: image,
        image2: image2




    })

});




console.log(blogListJson);
console.log("###" + blogListJson.length);

