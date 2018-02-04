var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');

/*var encodedQuery = querystring.escape('강식당 레시피');*/

router.get('/naver_image_search', function (req, last_response, next) {

    var page = req.query.page;
    var query = req.query.query;
    var displaySize= 10;

    var pageStart = (page - 1) * 10 + 1;

    var api_url = 'https://openapi.naver.com/v1/search/image?display=10&start='+pageStart + '&sort=sim&query='+ encodeURI(query); // json 결과


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!


        var blogArrray= {};

        blogArrray= JSON.parse(body);

        for ( var i=0; i<blogArrray.items.length;i++){

            let link= blogArrray.items[i].link

            blogArrray.items[i].webformatURL = link;

        }


        //console.log(prettyjson.render(blogArrray.items ,{noColor: true}));


        /*console.log(prettyjson.render(blogArrray.items ,{noColor: true}));*/

        last_response.json(blogArrray.items)

    });

});


router.get('/daum_image_search', function (req, last_response, next) {

    var page = req.query.page;
    var query = req.query.query;
    var displaySize= 10;

    request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/image?query=' + encodeURI(query) + '&page=' + page + '&size=10',
        method: 'GET'
    }, function (err, res, body) {


        var jsonArray = JSON.parse(body);

        let dataJson = jsonArray.documents;

        for (var i = 0; i < dataJson.length; i++) {

            let image_url =  encodeURI(dataJson[i].image_url)

            image_url_arr = image_url.split('type=');

            if ( image_url_arr.length==2){
                image_url = image_url_arr[0] + "type=w3";
            }


            dataJson[i].image_url = image_url;

        }
        //console.log(prettyjson.render(dataJson), {noColor: true});


        last_response.json(dataJson)
    });

});

module.exports = router;
