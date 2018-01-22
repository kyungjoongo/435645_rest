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

/*page.settings.l*/
var finalResult = [];

getRecepie(query, pageStart).then(result=>{


    getRecepie(query, 11).then(result2=>{

        result.push(...result2);
        logger.debug(result);
    })
})

//console.log(finalResult);


async function getRecepie(query, pageStart) {

    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
    const page = await instance.createPage();

    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });


    let url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=post" +
        "&query=" + encodeURI(query) + "&start=" + pageStart;

    const status = await page.open(url);
    let jquery = await page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');


    let result = await page.evaluate(function () {
        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.


        var blogListJson = [];
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

            })

        });

        return blogListJson;
    })


    //const content = await page.property('content');
    // console.log(result);

    return result;

   // logger.debug(result)

    await instance.exit();
}

