var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var querystring = require('querystring');
var prettyjson = require('prettyjson');
var page = 1;
var striptags = require('striptags');


var query = '백종원도 반한 돼지 두르치기 만들기'
var encodedQuery = querystring.escape(query);

var thenrequest = require('then-request');

thenrequest('GET', 'https://dapi.kakao.com/v2/search/image?query=' + encodedQuery + '&size=10&page=1', {

    'headers': {
        'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6','Content-Type': 'application/json;charset=UTF-8'
    }

}).done(res=>{


    console.log(res.getBody());


})






