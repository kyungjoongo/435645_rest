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

//#####################

router.get('/memcard/', function (req, last_response, next) {

    var page = req.query.page;
    /*var table_name = req.query.table_name;
    var search_word = req.query.search_word*/


    var res = syncRequest('post', 'http://mecard.sonokong.co.kr/Card/CardList?cardname=y&skillname=y&page='+ page);



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

    last_response.json(blogListJson)


});




module.exports = router;
