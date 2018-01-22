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

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
//########################


var page = 1
var query = '혼밥 레시피'
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

//last_response.json({result: finalListJson})


//console.log(finalListJson,'skdflskdf');

logger.debug("좋넹!!", finalListJson)