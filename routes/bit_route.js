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


router.get('/bit_detail', function (req, last_response, next) {

    var bitname = req.query.bitname;

    /**/

    var res = syncRequest('GET', 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=' + bitname);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());



    last_response.json({
        result: result

    })

});

router.get('/bit_list', function (req, last_response, next) {


    var btc = getBitCurrency('btc_krw');//비트코인
    var eth = getBitCurrency('eth_krw');//이더리움
    var bch_krw = getBitCurrency('bch_krw');//비트코인캐시
    var etc_krw = getBitCurrency('etc_krw');//이더리음클래식
    var xrp_krw = getBitCurrency('xrp_krw');//리플

    var arr = []

    arr.push({
        name: '비트코인'
        , sise: btc
        , engname: 'btc'
    })
    arr.push({
        name: '이더리움'
        , sise: eth
        , engname: 'eth'
    })

    arr.push({
        name: '비트코인 캐시'
        , sise: bch_krw
        , engname: 'bch'
    })
    arr.push({
        name: '이더리움 클래식'
        , sise: etc_krw
        , engname: 'etc'
    })
    arr.push({
        name: '리플'
        , sise: xrp_krw
        , engname: 'xrp'
    })


    /*비트코인 거래 기준으로 필드값을 가져온다.
    etc_krw(이더리움 클래식 거래 기준), eth_krw(이더리움 거래 기준), xrp_krw(리플 거래 기준), bch_krw(비트코인 캐시 기준)를 지정할 수 있으며, 이 외에 다른 코인은 지원하지 않는다*/


    last_response.json({
        result: arr

    })


});


function getBitCurrency(currecyName) {

    var res = syncRequest('GET', 'https://api.korbit.co.kr/v1/ticker?currency_pair=' + currecyName);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());
    console.log('##############' + result.last);

    var result = result.last;


    return result;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


router.get('/bit_one', function (req, last_response, next) {

    var name = req.query.name;

    request({
        encoding: null,
        uri: 'https://api.korbit.co.kr/v1/ticker?currency_pair=' + name,
        method: 'GET'
    }, function (err, res, body) {


        console.log('##############' + body);

        last_response.end(body);
    });


});
module.exports = router;
