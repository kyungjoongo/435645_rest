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

router.get('/coinone/:bitname', function (req, last_response, next) {

    var final_result_json = [];
    var bitname = req.params.bitname;

    if (bitname == undefined) {
        bitname = 'btc';
    }

    var res = syncRequest('GET', 'https://api.coinone.co.kr/ticker/?currency=' + bitname);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());

    last_response.json(result);

});


/**
 * 코인원 bit_list
 */
router.get('/coinone_list/', function (req, last_response, next) {

    var final_result_json = [];


    var res = syncRequest('GET', 'https://api.coinone.co.kr/ticker/?currency=all');
    console.log('##############' + res.getBody());
    var bit_result = JSON.parse(res.getBody());

    //btc, bch, eth, etc, xrp, qtum, iota, ltc, btg,

    var timestamp = bit_result.timestamp

    var btc = bit_result.btc
    var bch = bit_result.bch
    var eth = bit_result.eth
    var etc = bit_result.etc
    var xrp = bit_result.xrp
    var qtum = bit_result.qtum
    var iota = bit_result.iota
    var ltc = bit_result.ltc
    var btg = bit_result.btg


    btc.timestamp = timestamp;
    bch.timestamp = timestamp;
    eth.timestamp = timestamp;
    etc.timestamp = timestamp;
    xrp.timestamp = timestamp;
    qtum.timestamp = timestamp;
    iota.timestamp = timestamp;
    ltc.timestamp = timestamp;
    btg.timestamp = timestamp;


    final_result_json.push(btc);
    final_result_json.push(bch);
    final_result_json.push(eth);
    final_result_json.push(etc);
    final_result_json.push(xrp);
    final_result_json.push(qtum);
    final_result_json.push(iota);
    final_result_json.push(ltc);
    final_result_json.push(btg);


    last_response.json(final_result_json);

});

function get_coinone_coin_info(bitname) {


    var res = syncRequest('GET', 'https://api.coinone.co.kr/ticker/?currency=' + bitname);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());

    return result;

}


router.get('/bit_one/:bitname', function (req, last_response, next) {

    var bitname = req.params.bitname;


    request({

        encoding: null,
        uri: 'https://api.bithumb.com/public/ticker/' + bitname,
        method: 'GET'
    }, function (err, res, body) {


        var jsonArray = JSON.parse(body);

        last_response.json({result: jsonArray.data});


    });

});


router.get('/bit_all', function (req, last_response, next) {


    request({

        encoding: null,
        uri: 'https://api.bithumb.com/public/ticker/ALL',
        method: 'GET'
    }, function (err, res, body) {


        var jsonArray = JSON.parse(body);

        last_response.json({result: jsonArray.data});


    });

});


router.get('/bithumb_all_test', function (req, last_response, next) {


    var res = syncRequest('GET', 'https://api.bithumb.com/public/ticker/ALL');
    var body = res.getBody();

    var bit_result = JSON.parse(body).data;

    var cur_time = JSON.parse(body).data.date

    console.log('##############' + cur_time);




    var btc = bit_result.BTC
    var bch = bit_result.BCH
    var eth = bit_result.ETH
    var etc = bit_result.ETC
    var xrp = bit_result.XRP
    var qtum = bit_result.QTUM
    var iota = bit_result.IOTA
    var ltc = bit_result.LTC
    var btg = bit_result.BTG

/*
    btc.trader = 'coinone';
    bch.trader = 'coinone';
    eth.trader = 'coinone';
    etc.trader = 'coinone';
    xrp.trader = 'coinone';
    qtum.trader = 'coinone';
    iota.trader = 'coinone';
    ltc.trader = 'coinone';
    btg.trader = 'coinone';*/
    let final_result_json =[];

    final_result_json.push(btc);
    final_result_json.push(bch);
    final_result_json.push(eth);
    final_result_json.push(etc);
    final_result_json.push(xrp);
    final_result_json.push(qtum);
    final_result_json.push(iota);
    final_result_json.push(ltc);
    final_result_json.push(btg);


    last_response.json({result: final_result_json});


});


function make_bithumb_currency_list() {

    var res = syncRequest('GET', 'https://api.bithumb.com/public/ticker/ALL');
    var body = res.getBody();

    var bit_result = JSON.parse(body).data;

    var cur_time = JSON.parse(body).data.date

    console.log('##############' + cur_time);

    let merged_array = [];
    let btc = {}
    let bch = {}
    let eth = {}
    let etc = {}
    let xrp = {}
    let qtum = {}
    /*let iota = {}*/
    let ltc = {}
    let btg = {}

    //#########only_bithumnb#######
    let dash = {}
    let xmr = {}
    let zec = {}
    let eos = {}

    btc = bit_result.BTC
    bch = bit_result.BCH
    eth = bit_result.ETH
    etc = bit_result.ETC
    xrp = bit_result.XRP
    qtum = bit_result.QTUM
    /*iota = bit_result.IOTA*/
    ltc = bit_result.LTC
    btg = bit_result.BTG


    //#########only_bithumnb#######
    dash = bit_result.DASH
    xmr = bit_result.XMR
    zec = bit_result.ZEC
    eos = bit_result.EOS


    // bithumb
    /*{
        "opening_price": "13971000",
        "closing_price": "14501000",
        "min_price": "13554000",
        "max_price": "15498000",
        "average_price": "14634341.6217",
        "units_traded": "16730.01328942",
        "volume_1day": "16730.01328942",
        "volume_7day": "115175.59671271",
        "buy_price": "14500000",
        "sell_price": "14501000",
        "trader": "bithumb"
    }*/

    //coinone
    /*currency, last*/


    btc.trader = 'bithumb';
    btc.currency = 'btc'
    btc.last = btc.closing_price
    btc.timestamp = cur_time;

    bch.trader = 'bithumb';
    bch.currency = 'bch';
    bch.last = bch.closing_price
    bch.timestamp = cur_time;

    eth.trader = 'bithumb';
    eth.currency = 'eth';
    eth.last = eth.closing_price
    eth.timestamp = cur_time;

    etc.trader = 'bithumb';
    etc.currency = 'etc';
    etc.last = etc.closing_price
    etc.timestamp = cur_time;

    xrp.trader = 'bithumb';
    xrp.currency = 'xrp';
    xrp.last = xrp.closing_price
    xrp.timestamp = cur_time;


    qtum.trader = 'bithumb';
    qtum.currency = 'qtum';
    qtum.last = qtum.closing_price
    qtum.timestamp = cur_time;
    /*iota.trader = 'bithumb';*/

    ltc.trader = 'bithumb';
    ltc.currency = 'ltc';
    ltc.last = ltc.closing_price
    ltc.timestamp = cur_time;

    btg.trader = 'bithumb';
    btg.currency = 'btg';
    btg.last = btg.closing_price
    btg.timestamp = cur_time;


    //######################
    dash.trader = 'bithumb';
    dash.currency = 'dash';
    dash.last = dash.closing_price
    dash.timestamp = cur_time;

    xmr.trader = 'bithumb';
    xmr.currency = 'xmr';
    xmr.last = xmr.closing_price
    xmr.timestamp = cur_time;

    zec.trader = 'bithumb';
    zec.currency = 'zec';
    zec.last = zec.closing_price
    zec.timestamp = cur_time;

    eos.trader = 'bithumb';
    eos.currency = 'zec';
    eos.last = eos.closing_price
    eos.timestamp = cur_time;


    merged_array.push(btc);
    merged_array.push(bch);
    merged_array.push(eth);
    merged_array.push(etc);
    merged_array.push(xrp);
    merged_array.push(qtum);
    merged_array.push(ltc);
    merged_array.push(btg);


    //##################only bitumnb
    merged_array.push(dash);
    merged_array.push(xmr);
    merged_array.push(zec);
    merged_array.push(eos);



    return merged_array;

}


function make_coinone_currency_list() {

    var mergedArray = [];


    var res = syncRequest('GET', 'https://api.coinone.co.kr/ticker/?currency=all');
    console.log('##############' + res.getBody());
    var bit_result = JSON.parse(res.getBody());

    //btc, bch, eth, etc, xrp, qtum, iota, ltc, btg,

    var timestamp = bit_result.timestamp

    var btc = bit_result.btc
    var bch = bit_result.bch
    var eth = bit_result.eth
    var etc = bit_result.etc
    var xrp = bit_result.xrp
    var qtum = bit_result.qtum
    var iota = bit_result.iota
    var ltc = bit_result.ltc
    var btg = bit_result.btg


    btc.timestamp = timestamp;
    bch.timestamp = timestamp;
    eth.timestamp = timestamp;
    etc.timestamp = timestamp;
    xrp.timestamp = timestamp;
    qtum.timestamp = timestamp;
    iota.timestamp = timestamp;
    ltc.timestamp = timestamp;
    btg.timestamp = timestamp;


    btc.trader = 'coinone';
    bch.trader = 'coinone';
    eth.trader = 'coinone';
    etc.trader = 'coinone';
    xrp.trader = 'coinone';
    qtum.trader = 'coinone';
    iota.trader = 'coinone';
    ltc.trader = 'coinone';
    btg.trader = 'coinone';


    mergedArray.push(btc);
    mergedArray.push(bch);
    mergedArray.push(eth);
    mergedArray.push(etc);
    mergedArray.push(xrp);
    mergedArray.push(qtum);
    mergedArray.push(iota);
    mergedArray.push(ltc);
    mergedArray.push(btg);


    return mergedArray;
}

function make_corbit_currency_list() {


    var btc = getBitCurrency('btc_krw');//비트코인
    var eth = getBitCurrency('eth_krw');//이더리움
    var bch_krw = getBitCurrency('bch_krw');//비트코인캐시
    var etc_krw = getBitCurrency('etc_krw');//이더리음클래식
    var xrp_krw = getBitCurrency('xrp_krw');//리플

    var mergedArray = []


    mergedArray.push({
        name: '비트코인'
        , last: btc.last
        , timestamp: btc.timestamp
        , currency: 'btc'
        , trader: 'korbit'
    })
    mergedArray.push({
        name: '이더리움'
        , last: eth.last
        , timestamp: eth.timestamp
        , currency: 'eth'
        , trader: 'korbit'
    })

    mergedArray.push({
        name: '비트코인 캐시'
        , last: bch_krw.last
        , timestamp: bch_krw.timestamp
        , currency: 'bch'
        , trader: 'korbit'
    })
    mergedArray.push({
        name: '이더리움 클래식'
        , last: etc_krw.last
        , timestamp: etc_krw.timestamp
        , currency: 'etc'
        , trader: 'korbit'
    })
    mergedArray.push({
        name: '리플'
        , last: xrp_krw.last
        , timestamp: xrp_krw.timestamp
        , currency: 'xrp'
        , trader: 'korbit'
    })

    return mergedArray;

}


/**
 * 코인원 빗쎔 merge list
 */
router.get('/coinone_bithumb_list/', function (req, last_response, next) {

    var final_result_json = [];
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];

    temp1 = make_bithumb_currency_list();
    temp2 = make_coinone_currency_list();
    //temp3 = make_corbit_currency_list();

    temp1.push(...temp2);

    temp1.push(...temp3);


    last_response.json(temp1);

});

function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}


//###############################


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
        , sise: btc.last
        , timestamp: btc.timestamp
        , engname: 'btc'
    })
    arr.push({
        name: '이더리움'
        , sise: eth.last
        , timestamp: eth.timestamp
        , engname: 'eth'
    })

    arr.push({
        name: '비트코인 캐시'
        , sise: bch_krw.last
        , timestamp: bch_krw.timestamp
        , engname: 'bch'
    })
    arr.push({
        name: '이더리움 클래식'
        , sise: etc_krw.last
        , timestamp: etc_krw.timestamp
        , engname: 'etc'
    })
    arr.push({
        name: '리플'
        , sise: xrp_krw.last
        , timestamp: xrp_krw.timestamp
        , engname: 'xrp'
    })


    /*비트코인 거래 기준으로 필드값을 가져온다.
    etc_krw(이더리움 클래식 거래 기준), eth_krw(이더리움 거래 기준), xrp_krw(리플 거래 기준), bch_krw(비트코인 캐시 기준)를 지정할 수 있으며, 이 외에 다른 코인은 지원하지 않는다*/


    last_response.json({
        result: arr

    })


});


function getBitCurrency(currecyName) {

    var res = syncRequest('GET', 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=' + currecyName);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());
    console.log('##############' + result);

    var result = result;


    return result;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


router.get('/bit_one', function (req, last_response, next) {

    var name = req.query.name;

    request({
        encoding: null,
        uri: 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=' + name,
        method: 'GET'
    }, function (err, res, body) {


        console.log('##############' + body);

        last_response.end(body);
    });


});

//###########################
router.get('/korbit_one', function (req, last_response, next) {


    var name = req.query.name;

    if (name == undefined) {
        name = 'btc'
    }

    var res = syncRequest('GET', 'https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=' + name);
    console.log('##############' + res.getBody());
    var result = JSON.parse(res.getBody());
    console.log('##############' + result);

    var result = result;

    last_response.json(result)

});


module.exports = router;
