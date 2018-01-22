var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

var prettyjson = require('prettyjson');


var res = syncRequest('get', 'http://blog.naver.com/PostView.nhn?blogId=siamsun44&logNo=221182188762');


var blogListJson = [];

var body = res.getBody();

var $ = cheerio.load(body);
var imageList = [];

$('.se_mediaArea').each(function () {

    var image = $(this).children('img').attr('src')


    imageList.push(image);

    return false;

    //console.log('##############' + image);

});

for (var i = 0; i < imageList.length; i++) {

    console.log('--->' + imageList[i]);
}








