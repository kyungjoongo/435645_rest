var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");


/*requestPromise("http://www.roadrunnersports.com/rrs/mensshoes/mensshoesrunning/?p=96", function (error, response, body) {*/


var res = syncRequest('GET', 'http://www.drapt.com/e_sale/index.htm?page_name=saleinfo&menu_key=8&sub_menu=0&si=%B0%E6%B1%E2%B5%B5&gu=%BC%BA%B3%B2%BD%C3&dong=&sear_date=&sigong=&gubun=&viewline=30');

var $ = cheerio.load(res.getBody());

var resultJson = [];

$('.siselist_2010 > tbody > tr').each(function () {
    var image_url = $(this).find('.txt_name').children().text();
    var href = $(this).find('.txt_name').children().next().next().attr('href')

    //link_busi
    var link_busi = $(this).find('.link_busi').attr('href');

    //console.log('##############'+ arr_link_busi[1]);


    /*let link_busi2= link_busi.toString

    link_busi2 =link_busi2.substring(0,5)*/


    var _baseUrl = 'http://www.drapt.com/sise/html_view5/?no=57762&content_url=total.php%3Fno=57762'

    if ( href !=undefined){
        resultJson.push({
            "image_url" : image_url,
            href : href,
            link_busi:link_busi


        })
    }

    for ( var i=0; i<resultJson.length;i++){

        let number= resultJson[i].link_busi;

        number = number.replace('javascript:saleDetailInfo', '')
        number = number.replace('(\'', '')
        number = number.replace('\')', '')
        number = number.replace(';', '')

        console.log('##############'+ number);

        resultJson[i].link_busi = number;
    }




});



console.log(resultJson);





