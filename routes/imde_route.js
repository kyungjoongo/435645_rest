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


router.get('/imde_info_list/', function (req, last_response, next) {

    var page = req.query.page;
    var displaySize= 10;

    var start = (page-1) * displaySize + 1;

    var blogArray =[];

    var querystring = require('querystring');
    var encodedQuery = querystring.escape('임대주택 청약 정보');
    var api_url = 'https://openapi.naver.com/v1/search/blog?query='+ encodedQuery+ '&start='+ start+ '&display='+ displaySize+ '&sort=date'; // json 결과
    var striptags = require('striptags');
    var prettyjson = require('prettyjson');


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        blogArrray= JSON.parse(body);


        for ( var i=0; i<blogArrray.items.length;i++){


            console.log('##############'+ striptags(blogArrray.items[i].title))

            var title= striptags(blogArrray.items[i].title);

            var link = blogArrray.items[i].link.replace('&amp;', '&')


            var postdate = blogArrray.items[i].postdate

            var year= postdate.substring(0,4)
            var month= postdate.substring(4,6)
            var date= postdate.substring(6,8)

            var _date = year+"-"+ month+ "-"+  date;

            blogArrray.items[i].link = link;
            blogArrray.items[i].title = title;
            blogArrray.items[i].date = _date;

        }




        console.log(prettyjson.render(blogArrray.items ,{noColor: true}));

        last_response.json(blogArrray.items)
    });



});

module.exports = router;
