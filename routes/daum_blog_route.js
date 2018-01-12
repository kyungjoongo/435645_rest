var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');

router.get('/blog_list', function (req, _response, next) {

    var page = req.query.page;
    var query = req.query.query

    var encodedQuery = querystring.escape(query);;

    request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/blog?query='+ encodedQuery+ '&page='+ page +  '&size=20',
        method: 'GET'
    }, function (err, res, body) {
        //it works!

        var jsonArray = JSON.parse(body);

        for (var i = 0; i < jsonArray.documents.length; i++) {

            console.log(i)
            console.log(jsonArray.documents[i].url);

            var __url = jsonArray.documents[i].url;

/*
            var res = syncRequest('get', __url);
            var $ = cheerio.load(res.getBody());
            var image = $('.imageblock').first().children().attr('src');

            jsonArray.documents[i].datetime = image;*/

        }

        console.log(jsonArray.documents);

        /* _response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});

         _response.end(jsonArray.documents);*/

        _response.json(jsonArray.documents)
    });


});


module.exports = router;
