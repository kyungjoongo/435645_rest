var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var axios = require('axios');
var striptags = require('striptags');
var prettyjson = require('prettyjson');

/*var encodedQuery = querystring.escape('강식당 레시피');*/


router.get('/naver_blog_v2/', function (req, last_res, next) {

    var page = req.query.page;
    var query = req.query.query
    var encodedQuery = querystring.escape(query);

    request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/blog?query=' + encodedQuery + '&page=' + page + '&size=10',
        method: 'GET'
    }, function (err, res, body) {


        var jsonArray = JSON.parse(body);

        let dataJson = jsonArray.documents;
        

        for (var i = 0; i < dataJson.length; i++) {

            var clean_title = striptags(dataJson[i].title);

            dataJson[i].title = clean_title;

            

            var title= striptags(dataJson[i].title);
            var encodeTitle = querystring.escape(title);

            var result = syncRequest('GET', 'https://openapi.naver.com/v1/search/image?query=' + encodeTitle + '&display=2&start=1&sort=sim&filter=large',
                {
                    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
                }
            );

            var body = result.getBody();
            var imageData = JSON.parse(body);


            var imageLink= '';
            if ( imageData.items.length>0){
                imageLink = imageData.items[0].link;
            }

            console.log('##############'+ imageLink)

            dataJson[i].image = imageLink;


        }//for end


//        console.log(prettyjson.render(dataJson ,{noColor: true}));


        last_res.json(dataJson);

    });



});




//////////////////////
router.get('/naver_blog', function (req, last_res, next) {

    var page = req.query.page;
    var query = req.query.query
    var encodedQuery = querystring.escape(query);

    var start =( page -1)  * 10

    if (start == 0){
        start =1;
    }
    console.log('##############'+ start);

    var api_url = 'https://openapi.naver.com/v1/search/blog?display=10&query='+ encodedQuery+ '&start='+ start+ 'sort=date'; // json 결과
    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var blogArrray= JSON.parse(body);


        for ( var i=0; i<blogArrray.items.length;i++){



            var link = blogArrray.items[i].link.replace('&amp;', '&')

            console.log('##############'+ striptags(blogArrray.items[i].title))

            var title= striptags(blogArrray.items[i].title);
            var encodeTitle = querystring.escape(title);

            var result = syncRequest('GET', 'https://openapi.naver.com/v1/search/image?query=' + encodeTitle + '&display=2&start=1&sort=sim&filter=large',
                {
                    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
                }
            );

            var body = result.getBody();
            var data = JSON.parse(body);


            var imageLink= '';
            if ( data.items.length>0){
                imageLink = data.items[0].link;
            }

            console.log('##############'+ imageLink)

            blogArrray.items[i].image = imageLink;
            blogArrray.items[i].link = link;




        }


//        console.log(prettyjson.render(blogArrray.items ,{noColor: true}));


        last_res.json(blogArrray.items);

    });



});


////////////////////////////
router.get('/get_image', function (req, _response, next) {

    var query = req.query.query
    var encodedQuery = querystring.escape(query);

    var instance = axios.create({
        baseURL: 'https://dapi.kakao.com/v2/search/image?query=' + encodedQuery + '&page=1&size=10',
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'json'
    });

    instance.get().then(responseJson=>{
        console.log('##############'+ JSON.stringify(responseJson.data.documents[0].image_url));


        _response.json(responseJson.data.documents);
    });
});


router.get('/blog_list', function (req, _response, next) {


    var page = req.query.page;
    var query = req.query.query
    var encodedQuery = querystring.escape(query);

    request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/blog?query=' + encodedQuery + '&page=' + page + '&size=20',
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





router.get('/blog_list2', function (req, _response, next) {


    var page = req.query.page;
    var query = req.query.query

    var encodedQuery = querystring.escape(query);
    ;

    request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/blog?query=' + encodedQuery + '&page=' + page + '&size=20',
        method: 'GET'
    }, function (err, res, body) {
        //it works!

        _response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});

        _response.end(body);


    });


});


module.exports = router;
