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


var res = syncRequest('post', 'http://mecard.sonokong.co.kr/Card/CardList?page=2&cardname=y&skillname=y&searchString=');



var $ = cheerio.load(res.getBody());

var blogListJson = new Array()

var count= '';
$('.related  >li ').each(function () {

    var image= $(this).children().children().attr('src');
    var desc= $(this).children().children().attr('alt');
    var baseUrl = 'http://mecard.sonokong.co.kr'
    let __imageARr = image.split('?')
    let __imageARr2= __imageARr[1].split('=')

    ///Card/CardView?crd_idx=

    var popupbase = '/Card/CardView?crd_idx='

    popupbase = baseUrl + popupbase + __imageARr2[1]


    blogListJson.push({

        image: baseUrl+ image,
        desc:desc,
        href :__imageARr2[1],
        popup : popupbase

    })

});


console.log(blogListJson);
console.log("###" + blogListJson.length);

