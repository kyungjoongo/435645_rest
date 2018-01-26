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






var resInBlog = syncRequest('GET', 'http://www.gico.or.kr/supply/parcels/parcels_view.do?bcIdx=87&searchCategory=143&aIdx=10620');



var $ = cheerio.load(resInBlog.getBody());
var fianlresultJson = new Array()

/*title_num*/

var count= 0;
$('.t_view > tbody > tr').each(function () {

    var key= $(this).find('th').children('img').attr('alt');
    var value= $(this).find('td:nth-child(2)').text();


    if ( count ==5){
        let _tempArr=value.split('.pdf');


    }


    var result = {
        key : key,
        value : value
    }

    count++;


    fianlresultJson.push(result);
    /*console.log('################' + title);*/

});




console.log(fianlresultJson);
console.log("###" + fianlresultJson.length);





