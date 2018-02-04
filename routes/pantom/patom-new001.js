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
var page = 1
var query = '집밥 레시피'
var pageStart = (page - 1) * 10 + 1;
const phantom = require('phantom');
const mysql = require('nodejs-mysql').default;
const config = {
    host: '35.201.132.249',
    //host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}


/*page.settings.l*/
var finalResult = [];


getRecepie(1,1);


//console.log(finalResult);


async function getRecepie(query, pageStart) {

    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
    const page = await instance.createPage();

    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });


    let url = "http://www.todayhumor.co.kr/board/list.php?table=humordata&page=2"

    const status = await page.open(url);
    let jquery = await page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');


    let result = await page.evaluate(function () {
        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.


        var blogListJson = [];
        $('.list_tr_humordata').each(function () {


            var title = $(this).find('.subject').children().text();
            var href = $(this).find('.subject').find('a').attr("href");

            var fullHerf = "http://www.todayhumor.co.kr" + href

            blogListJson.push({
                title: title,
                href : fullHerf

            })


        });

        return blogListJson;
    })


    //const content = await page.property('content');
    console.log(result);

    return result;

    // logger.debug(result)

    await instance.exit();
}

