var driver = require('node-phantom-simple');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
var prettyjson = require('prettyjson');

var start = new Date();
var hrstart = process.hrtime();

driver.create({path: require('phantomjs').path}, function (err, browser) {
    return browser.createPage(function (err, page) {
        return page.open("https://search.naver.com/search.naver?sm=tab_hty.top&where=post&query=%EB%B0%B1%EC%A2%85%EC%9B%90+%EB%A0%88%EC%8B%9C%ED%94%BC&oquery=%27+++encodedStr++%27&tqi=TERdHdpVuElssbicJ8RssssssMd-404748", function (err, status) {
            console.log("opened site? ", status);
            page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err) {
                // jQuery Loaded.
                // Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                //setTimeout(function () {
                return page.evaluate(function () {
                    //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.

                    var blogListJson = [];

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

                        })

                    });

                    var finalListJson = {
                        count: count,
                        blog_list: blogListJson
                    }



                    return {
                        result: finalListJson
                    };
                }, function (err, result) {
                    //console.log(result);



                    setTimeout(function (argument) {
                        // execution time simulated with setTimeout function
                        var end = new Date() - start,
                            hrend = process.hrtime(hrstart);

                        console.info("Execution time: %dms", end);
                        console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
                    }, 1);

                    logger.debug(prettyjson.render(result))

                    browser.exit();
                });
                //}, 500);
            });
        });
    });
});