var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");



var str = '집밥 백선생 레시피 모음'
var qs = require('querystring');

var encodedStr = qs.escape(str);

var blog_href= 'blog.naver.com/kimbeaver'


var o_url= 'https://search.naver.com/search.naver?date_from=' +
    '&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=blog.naver.com%2Fkimbeaver&post_blogurl_without=' +
    '&query=%EC%A7%91%EB%B0%A5%20%EB%B0%B1%EC%84%A0%EC%83%9D%20%EB%A0%88%EC%8B%9C%ED%94%BC%20%EB%AA%A8%EC%9D%8C&sm=tab_pge&srchby=all&st=sim&where=post&start=11'



var resInBlog = syncRequest('GET', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso='+
    '&post_blogurl=' + blog_href +
    '&post_blogurl_without=&qdt=0' +
    '&query=' + encodedStr +
    '&qvt=0' +
    '&sm=tab_pge&srchby=all&st=sim&where=post&start=1'
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




console.log(fianlresultJson);
console.log("###" + fianlresultJson.length);





