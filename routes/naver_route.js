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


//###############################
/*

router.get('/naver_p', function (req, last_response, next) {

    var page = req.query.page;
    var query = req.query.query;
    var pageStart = (page - 1) * 10 + 1;


    let result= getRecepie(req, last_response, next, query, pageStart)


});


async function getRecepie (req, last_response, next,query, pageStart) {
    const phantom = require('phantom');
    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);


    const page = await instance.createPage();
    /!*page.settings.l*!/
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });

    let url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=post" +
        "&query=" + encodeURI(query) + "&start="+ pageStart

    const status = await page.open(url);
    let jquery = await page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');

    let result = await page.evaluate(function () {
        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.

        var blogListJson = [];


        $('.sh_blog_top').each(function () {


            var image = $(this).find('.thumb').children().children('img').attr('src');
            var title = $(this).find('._sp_each_title').attr('title');
            var href = $(this).find('._sp_each_title').attr('href');

            /!*
                https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MTZfMjUx%2F
                    // MDAxNDk0ODYxNTY0NTk3.2Rh3Z3K32gZ4Z8yzW6jMp79vdG3j7Do5NWUQsHfTuYUg.e5
                    // mKgSvA0lxboKa-7r0ibk5N6oIsJHJaTpCCJJQdMGIg.JPEG.witchyoli%2F%25C8%25A5%25B9%25
                    // E4%25B8%25DE%25B4%25BA%25B8%25F0%25C0%25BD.jpg%23740x740&type=m80_80*!/


            if (image != undefined) {

                var image_prefix = image.substr(0, image.lastIndexOf("=") + 1);
                image = image_prefix + "m640_640";
            }


            //inline
            var blog_href = $(this).find('.inline').children().attr('href');

            //sh_blog_title _sp_each_url _sp_each_title

            blogListJson.push({
                image: image,
                title: title,
                href: href,

            })

        });

        return {result: blogListJson};
    });


    //const content = await page.property('content');
    console.log(result);


    last_response.json(result)

    await instance.exit();
}

*/

//########################

router.get('/naver_c', function (req, last_response, next) {

    var page = req.query.page;
    var query = req.query.query;
    var pageStart = (page - 1) * 10 + 1;


    // var str = '혼밥 레시피'


    var encodedStr = encodeURI(query)


    var res = syncRequest('get', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query=' + encodedStr +
        '&start=' + pageStart);


    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count = '';
    $('.title_num').each(function () {

        var title = $(this).text();

        var _titles = title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        /*
            https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MTZfMjUx%2F
                // MDAxNDk0ODYxNTY0NTk3.2Rh3Z3K32gZ4Z8yzW6jMp79vdG3j7Do5NWUQsHfTuYUg.e5
                // mKgSvA0lxboKa-7r0ibk5N6oIsJHJaTpCCJJQdMGIg.JPEG.witchyoli%2F%25C8%25A5%25B9%25
                // E4%25B8%25DE%25B4%25BA%25B8%25F0%25C0%25BD.jpg%23740x740&type=m80_80*/


        if (image != undefined) {

            var image_prefix = image.substr(0, image.lastIndexOf("=") + 1);
            image = image_prefix + "m640_640";
        }


        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href: href,
            blog_href: blog_href

        })

    });

    var finalListJson = {
        count: count,
        blog_list: blogListJson
    }

    last_response.json({result: finalListJson})

});

//#############################
router.get('/naver002', function (req, last_response, next) {
    var prettyjson = require('prettyjson');
    var page = req.query.page;
    var query = req.query.query;
    var pageStart = (page - 1) * 10 + 1;

    var api_url = 'https://openapi.naver.com/v1/search/blog.json?sort=date&query=' + encodeURI('집밥 레시피') + '&start=' + pageStart + '&display=10'
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

            if (splitArr[3].includes('?')) {

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
                new_result.image = imageList;
                new_array_list.push(new_result)
            }

        }


        last_response.json(new_array_list);

        //prettyjson

        //console.log('##############'+ prettyjson.render(new_array_list));


    });


});

/*uri: 'https://dapi.kakao.com/v2/search/blog?sort=recency&query=' + encodedQuery + '&page=' + page + '&size=20',*/
/**
 *
 *
 */
router.get('/naver001', function (req, last_response, next) {
    var prettyjson = require('prettyjson');
    var page = req.query.page;
    var query = req.query.query;
    var pageStart = (page - 1) * 10 + 1;


    var api_url = 'https://openapi.naver.com/v1/search/blog.json?sort=date&query=' + encodeURI(query) + '&start=' + pageStart + '&display=10'
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

            if (splitArr[3].includes('?')) {

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
                new_result.image = imageList;
                new_array_list.push(new_result)
            }

        }


        last_response.json(new_array_list);


    });
});


function getNaverImgs(new_uri) {


    var res = syncRequest('get', new_uri);

    var body = res.getBody();

    var $ = cheerio.load(body);
    var imageList = [];

    var firstImage = '';

    $('.se_mediaArea').each(function () {

        var image = $(this).children('img').attr('src')
        //imageList.push(image);

        firstImage = image;

        return false;
        //console.log('##############' + image);

    });

    return firstImage;


}


module.exports = router;
