var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

var prettyjson = require('prettyjson');
var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI('백종원 레시피'); // json 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
var request = require('request');
var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'}
};
request.get(options, function (error, res, body) {

    var p_json =[];
    var p_json=prettyjson.render(body,{noColor: true})

    console.log('##############'+ p_json);
    /*res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    res.end(body);*/

});