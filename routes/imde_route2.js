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

/*var encodedQuery = querystring.escape('강식당 레시피');*/

router.get('/kyunggi_bunyang_apt_list_detail', function (req, last_response, next) {


    var index = '';

    if ( req.query.index == undefined){
        index =10639;
    }else{
        index = req.query.index;
    }


    var resInBlog = syncRequest('GET', 'http://www.gico.or.kr/supply/parcels/parcels_view.do?bcIdx=87&searchCategory=143&aIdx='+ index);



    var $ = cheerio.load(resInBlog.getBody());
    var fianlresultJson = new Array()

    /*title_num*/

    var count= '';
    $('.t_view > tbody > tr').each(function () {

        var key= $(this).find('th').children('img').attr('alt');
        var value= $(this).find('td:nth-child(2)').text();



        var result = {
            key : key,
            value : value
        }


        fianlresultJson.push(result);
        /*console.log('################' + title);*/

    });




    console.log(fianlresultJson);
    console.log("###" + fianlresultJson.length);

    last_response.json(fianlresultJson)

});


router.get('/kyunggi_bunyang_apt_list', function (req, last_response, next) {



    var page = 1;

    if ( req.query.index == undefined){
        page = 1;
    }else{
        page = req.query.page;
    }



    var resInBlog = syncRequest('POST', 'http://www.gico.or.kr/supply/parcels/parcels_list.do?bcIdx=87&searchCategory=143&pageNo='+ page);



    var $ = cheerio.load(resInBlog.getBody());
    var fianlresultJson = new Array()

    /*title_num*/

    var count= '';
    $('.t_list > tbody > tr').each(function () {


        var no = $(this).find('td:nth-child(1)').text();
        var sort = $(this).find('td:nth-child(2)').text();
        var title = $(this).find('.t_subject').children().text();
        var index = $(this).find('.t_subject').children().attr('onclick');
        var date = $(this).find('td:nth-child(6)').text();

        var doc_ref = $(this).find('.pop-alllist').children().attr('href');

        //doc_ref = 'http://www.gico.or.kr'+ doc_ref;


        let _tempArr = index.split(',');

        let _tempIndex = _tempArr[0].replace('goView(', '');

        _tempIndex = _tempIndex.substring(1, _tempIndex.length - 1)


        var pop_list = [];
        //pop-list
        $('#layer' + _tempIndex + ' >  div > div > ul > li ').each(function () {

            var doc = $(this).children().attr('href');
            pop_list.push(doc);


        });

        if (doc_ref != '#') {

            if (doc_ref != undefined) {
                pop_list.push(doc_ref);
            }

        }


        var result = {
            no: no,//번호
            sort: sort,//구분
            date: date, //등록일
            index: _tempIndex, //index
            /*doc_ref: doc_ref,*/
            pop_list: pop_list,
            title: title //제목
        }


        fianlresultJson.push(result);
        /*console.log('################' + title);*/
    });


    console.log(fianlresultJson);
    console.log("###" + fianlresultJson.length);


    last_response.json(fianlresultJson)


});


module.exports = router;
