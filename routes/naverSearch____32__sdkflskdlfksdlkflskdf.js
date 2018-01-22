var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");

var prettyjson = require('prettyjson');
//var pageStart = (page-1) * 10 +1;

var api_url = 'https://openapi.naver.com/v1/search/blog.json?sort=date&query=' + encodeURI('집밥 레시피')+ '&start=' + '1' + '&display=10'
var request = require('request');
var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'}
};

var p_json = [];
request.get(options, function (error, res, body) {


    var result = JSON.parse(body).items;

    var new_array_list = [];


    /*http://blog.naver.com/PostView.nhn?blogId=siamsun44&logNo=221182188762*/

    for (var i = 0; i < result.length; i++) {

        var new_result = {};

        var uri = result[i].link;

        new_result.title = result[i].title;
        new_result.link = result[i].link;
        new_result.description = result[i].description;
        new_result.bloggername = result[i].bloggername;
        new_result.bloggerlink = result[i].bloggerlink;
        new_result.postdate = result[i].postdate;


        var splitArr = uri.split("/");

        // console.log('#####split#########'+ splitArr[3]);

        if (splitArr[3].includes('?')){

            var _temp = splitArr[3].split('?')

            var blogId = _temp[0];

            //console.log('#######temp1#######'+ _temp[1]);
            "Redirect=Log&amp;logNo=221190117001"
            var ____temp = _temp[1].split("&")

            "amp;logNo=221190117001"
            var __temp2 = ____temp[1].split('=')

            var logNo = __temp2[1];

            /*console.log('blogId-->' + blogId);

            console.log('logNo-->' + logNo);*/

            var new_uri = 'http://blog.naver.com/PostView.nhn?blogId=' + blogId + '&logNo=' + logNo;


            //####################################################################

            var imageList = getNaverImgs(new_uri);


            new_result.link = new_uri;
            new_result.image= imageList;
            new_array_list.push(new_result)
        }

    }


    //last_response.json(new_array_list);

    //prettyjson

    console.log('##############'+ prettyjson.render(new_array_list));


});



function getNaverImgs(new_uri){


    var res = syncRequest('get', new_uri);

    var body = res.getBody();

    var $ = cheerio.load(body);
    var imageList = [];

    var firstImage ='';

    $('.se_mediaArea').each(function () {

        var image = $(this).children('img').attr('src')
        //imageList.push(image);

        firstImage = image;

        return false;
        //console.log('##############' + image);

    });

    return firstImage;


}

