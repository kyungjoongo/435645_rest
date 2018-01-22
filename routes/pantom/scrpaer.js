var scraperjs = require('scraperjs');


scraperjs.StaticScraper.create('https://search.naver.com/search.naver?sm=tab_hty.top&where=post&query=%EB%B0%B1%EC%A2%85%EC%9B%90+%EB%A0%88%EC%8B%9C%ED%94%BC&oquery=%27+++encodedStr++%27&tqi=TERdHdpVuElssbicJ8RssssssMd-404748').scrape(function ($) {

    /*return $(".title a").map(function () {
        return $(this).text();
    }).get();*/


    $('.sh_blog_top').each(function () {

        var blogListJson = [];

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
        return {result: blogListJson};

    }).get();



}).then(function (result) {


    console.log(result);
})