var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var SqlString = require('sqlstring');
const mysql = require('nodejs-mysql').default;


var api_url = 'http://www.todayhumor.co.kr/board/list.php?table=humordata';
var fianlresultJson = new Array()



request({
    /*headers: {
        'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
        , 'Content-Type': 'application/json;charset=UTF-8'
    },*/
    encoding: null,
    uri: api_url,
    method: 'GET'
}, function (err, res, body) {



    var $ = cheerio.load(body);

 //   console.log(JSON.parse(body));

    $('.view').each(function () {

        var title= $(this).html();


        console.log('################' + title);

    });


});
/*


var count = '';
$('.view list_tr_humordata').each(function () {

    var no = $(this).find('td:nth-child(1)').text();
    var subject = $(this).find('td[class=subject]').text();

    var date = $(this).find('td:nth-child(6)').text();



    pop_list = SqlString.escape(pop_list);

    var result = {
        subject: subject,//번호
    }




    fianlresultJson.push(result);
    /!*console.log('################' + title);*!/

});


console.log(fianlresultJson);
console.log("###" + fianlresultJson.length);



*/





