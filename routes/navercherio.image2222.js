var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");


var querystring = require('querystring');

var encodedQuery = querystring.escape('백종원 레시피');

var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodedQuery; // json 결과

var image_api = 'https://openapi.naver.com/v1/search/image?query=' + encodedQuery + '&display=20&start=1&sort=sim&filter=large'
var striptags = require('striptags');


var result = syncRequest('GET', 'https://openapi.naver.com/v1/search/image?query=' + encodedQuery + '&display=1&start=1&sort=sim&filter=large',
    {
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
    }
);

var body = result.getBody();
var data = JSON.parse(body);
var imageLink = data.items[0].link;

console.log('##############'+data.items[0].link)


