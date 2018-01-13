var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");


var querystring = require('querystring');

var encodedQuery = querystring.escape('백종원 레시피');
var api_url = 'https://openapi.naver.com/v1/search/blog?query='+ encodedQuery; // json 결과
var image_api = 'https://openapi.naver.com/v1/search/image?query='+ encodedQuery+ '&display=20&start=1&sort=sim&filter=large'
var striptags = require('striptags');
var prettyjson = require('prettyjson');


request({
    url: api_url,
    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
    method: 'GET'
}, function (err, _response, body) {
    //it works!

    var blogArrray= JSON.parse(body);


    for ( var i=0; i<blogArrray.items.length;i++){




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

        blogArrray.items[i].img = imageLink;




    }


    console.log(prettyjson.render(blogArrray.items ,{noColor: true}));

});


/*
        "title": "[백종원레시피]제육볶음",
            "link": "http://post.phinf.naver.net/20150716_274/dksmf2626_1437006687421fHRrH_JPEG/mug_obj_201507160931275403.jpg",
            "thumbnail": "http://tv01.search.naver.net/ugc?q=http://post.phinf.naver.net/20150716_274/dksmf2626_1437006687421fHRrH_JPEG/mug_obj_201507160931275403.jpg",
            "sizeheight": "416",
            "sizewidth": "740"
*/