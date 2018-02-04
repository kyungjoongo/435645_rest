var request = require("request");
var cheerio = require("cheerio");
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var replaceall = require("replaceall");
var queryString = require('querystring');
const mysql = require('nodejs-mysql').default;
const config = {
    //host: 'localhost',
    //35.201.132.249
    host: '35.201.132.249',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}
const db = mysql.getInstance(config)

for (var i = 1; i <= 150; i++) {

    (function (index) {
        setTimeout(function () {

            console.log(index);

            insertCrawlingAndInsertDb('강식당 레시피', index, 'receipe_list')

        }, i * 1000);
    })(i);




}




function insertCrawlingAndInsertDb(query, page, tableName) {

    var pageStart = (page - 1) * 10 + 1;

    var uri2= 'https://search.naver.com/search.naver?' +
        'where=post&st=date&sm=tab_opt&date_from=&date_to=&' +
        'date_option=0&srchby=all&dup_remove=1&post_blogurl=' +
        '&post_blogurl_without=%27%20%20%20%27&nso=so%3Add%2Ca%3Aall%2Cp%3Aall&mson=0&query='+ queryString.escape(query) +'&start=' + pageStart;



    var res = syncRequest('get', uri2);


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
        //##############################
        // insert
        //##############################
        db.exec('insert into '+ tableName+ ' set ?', {
            image: image,
            title: title,
            href: href,
            blog_href: blog_href
        }).then(rows => {
            console.log('###########good' + JSON.stringify(rows));
        })

    });
    /*
        var finalListJson = {
            count: count,
            blog_list: blogListJson
        }*/


    console.log(blogListJson);
}


//console.log("###" + finalListJson.length);






