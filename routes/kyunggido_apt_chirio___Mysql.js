var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var SqlString = require('sqlstring');
const mysql = require('nodejs-mysql').default;
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test',
    connectionLimit: 10,
    acquireTimeout: 60000, //30 secs
}
const db = mysql.getInstance(config)

for (var i = 1; i <= 13; i++) {


    get_and_insert_kyunggido_apt_bunyang_list(i);


}


function get_and_insert_kyunggido_apt_bunyang_list(page) {


    var api_url = 'http://www.gico.or.kr/supply/parcels/parcels_list.do?bcIdx=87&searchCategory=143&pageNo=' + page;
    var fianlresultJson = new Array()
    var res = syncRequest('GET', api_url);
    var $ = cheerio.load(res.getBody());

    var count = '';
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

            var __temp = doc.split("=");
            doc = __temp[1];
            pop_list.push(doc);


        });

        if (doc_ref != '#' && doc_ref != undefined) {


            var __temp = doc_ref.split("=");
            doc_ref = __temp[1];

            if (doc_ref != undefined) {
                pop_list.push(doc_ref);
            }


        }

        pop_list =  encodeURI(pop_list);

        var result = {
            no: no,//번호
            sort: sort,//구분
            date: date, //등록일
            index: _tempIndex, //index
            /*doc_ref: doc_ref,*/
            pop_list: pop_list,
            title: title //제목
        }

        //##############################
        // insert
        //##############################
        db.exec('insert into ' + 'kyunggido_apt_bunyang' + ' set ?', {
            no: no,//번호
            sort: sort,//구분
            date: date, //등록일
            aIndex: _tempIndex, //index
            pop_list: pop_list,
            title: title //제목
        }).then(rows => {
            console.log('###########good' + JSON.stringify(rows));
        })


        fianlresultJson.push(result);
        /*console.log('################' + title);*/

    });


    console.log(fianlresultJson);
    console.log("###" + fianlresultJson.length);

    return fianlresultJson;
}


/*title_num*/






