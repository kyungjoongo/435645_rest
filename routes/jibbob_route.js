var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');


router.get('/r_list', function (req, _response, next) {

    var page = req.query.page;
    var receipeName = req.query.receipeName;
    var pageStart = (page - 1) * 10 + 1;

    var str = receipeName
    var qs = require('querystring');
    var encodedStr = qs.escape(str);


    var res = syncRequest('get', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+
        '&start='+ pageStart);



    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        if ( image != undefined){
            image = image.replace('m80_80','m640_640')
        }

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })

    });

    var finalListJson = {
        count : count,
        blog_list : blogListJson
    }


    console.log(finalListJson);
    console.log("###" + finalListJson.length);


    _response.json({result: finalListJson});
});



router.get('/hb_list/:page', function (req, _response, next) {

    var page = req.params.page;
    var pageStart = (page - 1) * 10 + 1;

    var str = '혼밥 레시피 모음'
    var qs = require('querystring');

    var encodedStr = qs.escape(str);


    var res = syncRequest('get', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+
        '&start='+ pageStart);



    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        if ( image != undefined){
            image = image.replace('m80_80','m640_640')
        }

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })

    });

    var finalListJson = {
        count : count,
        blog_list : blogListJson
    }


    console.log(finalListJson);
    console.log("###" + finalListJson.length);


    _response.json({result: finalListJson});
});


router.get('/nb_list/:page', function (req, _response, next) {

    var page = req.params.page;
    var pageStart = (page - 1) * 10 + 1;




    var str = '냉장고를 부탁해 레시피 모음'
    var qs = require('querystring');

    var encodedStr = qs.escape(str);


    var res = syncRequest('get', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+
        '&start='+ pageStart);



    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        if ( image != undefined){
            image = image.replace('m80_80','m640_640')
        }

        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })

    });

    var finalListJson = {
        count : count,
        blog_list : blogListJson
    }

    _response.json({result: finalListJson});

});



router.get('/jibbob_blog_list/:page', function (req, _response, next) {


    var page = req.params.page;

    var pageStart = (page - 1) * 10 + 1;

    console.log('################' + pageStart);




    var str = '집밥 백선생 레시피'
    var qs = require('querystring');

    var encodedStr = qs.escape(str);


    var res = syncRequest('GET', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+
        '&start='+ pageStart);



    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        if ( image != undefined){

            image = image.replace('m80_80','m640_640')
        }

        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })

    });

    var finalListJson = {
        count : count,
        currentPage : page,
        blog_list : blogListJson

    }


    _response.json({result: finalListJson});
});




router.get('/jibbob_list/:page', function (req, _response, next) {


    var page = req.params.page;

    var pageStart = (page - 1) * 10 + 1;

    console.log('################' + pageStart);



    var str = '집밥 백선생 레시피 모음'
    var qs = require('querystring');

    var encodedStr = qs.escape(str);

    var blog_href= 'blog.naver.com/kimbeaver'


    var resInBlog = syncRequest('GET', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso='+
        '&post_blogurl=' + blog_href +
        '&post_blogurl_without=&qdt=0' +
        '&query=' + encodedStr +
        '&qvt=0' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&start='+ pageStart
    );



    var $ = cheerio.load(resInBlog.getBody());
    var fianlresultJson = new Array()

    /*title_num*/

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });


    var receipeListJson = new Array()

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');


        /*sh_blog_title _sp_each_url _sp_each_title*/


        /*type=m320_320*/
        /*type=m640_640*/
        if ( image != undefined){

            image = image.replace('m80_80','m320_320')
        }



        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        //sh_blog_title _sp_each_url _sp_each_title

        receipeListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })


    });

    var fianlresultJson= {

        count : count,
        receipes : receipeListJson

    }

    _response.json({result: fianlresultJson});
});


module.exports = router;
