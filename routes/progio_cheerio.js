var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var SqlString = require('sqlstring');


var api_url = 'https://www.prugio.com/sale/sale.aspx?menu=1';
var fianlresultJson = new Array()
var res = syncRequest('GET', api_url);
var $ = cheerio.load(res.getBody());



var count = '';
$('.content > ul > li ').each(function () {

    var thumb = $(this).children().find('thumb').html();


    var result = {
        thumb: thumb
    }


    fianlresultJson.push(result);
    /*console.log('################' + title);*/

});


console.log(fianlresultJson);
console.log("###" + fianlresultJson.length);








