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


router.get('/currency/:bitname', function (req, last_response, next) {

    var bitname = req.params.bitname;
    var bitOneResult = [];

    var result1 = get_coinone_one(bitname);
    var result2 = get_bithumb_one(bitname);
    var result3 = get_korbit_one(bitname);

    if (result1 != '')
        bitOneResult.push(result1)
    if (result2 != '')
        bitOneResult.push(result2)
    if (result3 != '')
        bitOneResult.push(result3)


    last_response.json({result: bitOneResult});

});

function get_coinone_one(bitname) {

    /*btc, bch, eth, etc, xrp, qtum, iota, ltc, btg, all*/
    if (bitname == 'btc'
        || bitname == 'bch'
        || bitname == 'eth'
        || bitname == 'etc'
        || bitname == 'xrp'
        || bitname == 'qtum'
        || bitname == 'iota'
        || bitname == 'ltc'
        || bitname == 'btg'
    ){
        var res = syncRequest('GET', 'https://api.coinone.co.kr/ticker/?currency=' + bitname);

        var result = {}
        result = JSON.parse(res.getBody());

        result.trader = 'coinone';
        result.trade_time = result.timestamp;

        console.log('##############' + result);

        return result;
    }else {
        return '';
    }


}

function get_bithumb_one(bitname) {

    //###############################

    var res = syncRequest('GET', 'https://api.bithumb.com/public/ticker/' + bitname);

    if ( res.statusCode ==200 ){
        var body = res.getBody();


        var result = {}
        result = JSON.parse(body).data;

        result.trader = 'bithumb';
        result.last = result.closing_price;
        result.currency = bitname;
        result.trade_time = result.date

        console.log('#####1#########' + result);

        return result;
    }else{
        return '';
    }

}

function get_korbit_one(bitname) {


    //###############################korbit
    var res = syncRequest('GET', 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=' + bitname + '_krw');

    if (res.statusCode == 200) {
        console.log('##############' + res.getBody());
        var result = {};
        result = JSON.parse(res.getBody());

        result.trader = 'korbit';
        result.currency = bitname;
        result.trade_time = result.timestamp;

        console.log('######2########' + result);

        return result;
    } else {
        return '';
    }


}

module.exports = router;
