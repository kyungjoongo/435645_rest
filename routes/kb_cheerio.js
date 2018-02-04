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


var res = syncRequest('post', 'http://nland.kbstar.com/quics?page=B046948&cc=b056692:b056692#loading');



var $ = cheerio.load(res.getBody());

var blogListJson = new Array()

var count= '';
$('.board_list > table > tbody > tr ').each(function () {

    var title= $(this).html();



    blogListJson.push({

        title: title,


    })

});


console.log(blogListJson);
console.log("###" + blogListJson.length);

