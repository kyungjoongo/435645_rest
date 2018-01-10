var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

/*requestPromise("http://www.roadrunnersports.com/rrs/mensshoes/mensshoesrunning/?p=96", function (error, response, body) {*/

var str = '집밥 백선생 레시피 모음'
var qs = require('querystring');

var encodedStr = qs.escape(str);


var res = syncRequest('get', 'https://www.google.co.kr/search?q=%EC%A7%91%EB%B0%A5+%EB%B0%B1%EC%84%A0%EC%83%9D+%EB%A0%88%EC%8B%9C%ED%94%BC+url:http://cafe.naver.com&dcr=0&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi95IK_zcnYAhWEiLwKHcyKDLQQ_AUICygC&biw=1536&bih=743#imgrc=_');
var $ = cheerio.load(res.getBody());
var blogListJson = new Array()


$(".rg_ic").each(function () {

    var title = $(this).text();

    //sh_blog_title _sp_each_url _sp_each_title

    blogListJson.push({

        title: title


    })

});


console.log(blogListJson);
console.log("###" + blogListJson.length);





