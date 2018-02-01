var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
var page = 1
var query = '집밥 레시피'
var pageStart = (page - 1) * 10 + 1;
const phantom = require('phantom');
const mysql = require('nodejs-mysql').default;
//var dateFormat = require('dateFormat.min');


insertHumorToMysql()


//console.log(finalResult);


async function insertHumorToMysql() {

    const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
    const page = await instance.createPage();
    //

    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });


    /*for (let i = 1; i < 500; i++) {*/

    console.log('#######curpage #######' + 1);

    //  page.settings.resourceTimeout = 600000; //

    await insertDate(1, page);
    //}


    //return result;

    // logger.debug(result)

    await instance.exit();
}

async function insertDate(curPage, page) {

    let url = "http://www.todayhumor.co.kr/board/list.php?table=humordata&page=" + curPage;

    const status = await
        page.open(url);
    let jquery = await
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');


    let result = await  page.evaluate(function () {
        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.


        var blogListJson = [];
        $('.list_tr_humordata').each(function () {


            var title = $(this).find('.subject').children().text();
            var href = $(this).find('.subject').find('a').attr("href");
            var date = $(this).find('.date').text();

            var dateArr = date.split("/");

            var fullDate = dateArr[0] + dateArr[1] + dateArr[2];
            fullDate = fullDate.substring(0, 6);

            console.log('##############' + fullDate);

            var fullHerf = "http://www.todayhumor.co.kr" + href


            blogListJson.push({
                title: title,
                href: fullHerf,
                compare_date: fullDate,
                date: date
            })


        });

        return blogListJson;
    })//end of Let


    //const content = await page.property('content');

    const config = {
        host: '35.201.132.249',
        //host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1114',
        database: 'test'
    }

    const db = mysql.getInstance(config)


    var curDate = dateFormat(new Date(), 'Y-m-d ');
    curDate = curDate.substring(2, curDate.length)
    var curDateArr = curDate.split("-");
    var fullCurDate = curDateArr[0] + curDateArr[1] + curDateArr[2]
    console.log('##############' + fullCurDate);


    result.map(res => {


        //오늘의 날짜이거나 오늘 이상의 날짜의 데이타이면 인서트 한다.
        if ( parseInt(res.compare_date.trim()) >= parseInt(fullCurDate.trim()) ){


            db.exec('insert into ' + 'humor001' + ' set ?', {
                title: res.title,
                url: res.href
            }).then(rows => {
                console.log('###########insreted!' + JSON.stringify(rows));
            })
        }




    })


    console.log(result);
}


function dateFormat(g, c, k) {
    function l(a, b) {
        a.setHours(a.getHours() + parseFloat(b));
        return a
    }

    function m(a, b) {
        var c = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
        return b ? c[a.getDay()].substr(0, 3) : c[a.getDay()]
    }

    function n(a, b) {
        var c = "January February March April May June July August September October November December".split(" ");
        return b ? c[a.getMonth()].substr(0, 3) : c[a.getMonth()]
    }

    var d = {
        d: function () {
            var a = this.getDate();
            return 9 < a ? a : "0" + a
        }, D: function () {
            return m(this, !0)
        }, j: function () {
            return this.getDate()
        },
        l: function () {
            return m(this)
        }, N: function () {
            return this.getDay() + 1
        }, S: function () {
            var a = this.getDate();
            return /^1[0-9]$/.test(a) ? "th" : /1$/.test(a) ? "st" : /2$/.test(a) ? "nd" : /3$/.test(a) ? "rd" : "th"
        }, w: function () {
            return this.getDay()
        }, z: function () {
            return Math.round(Math.abs((this.getTime() - (new Date("1/1/" + this.getFullYear())).getTime()) / 864E5))
        }, W: function () {
            var a = new Date(this.getFullYear(), 0, 1);
            return Math.ceil(((this - a) / 864E5 + a.getDay() + 1) / 7)
        }, F: function () {
            return n(this)
        }, m: function () {
            var a = this.getMonth() +
                1;
            return 9 < a ? a : "0" + a
        }, M: function () {
            return n(this, !0)
        }, n: function () {
            return this.getMonth() + 1
        }, t: function () {
            return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate()
        }, L: function () {
            var a = this.getFullYear();
            return 0 == a % 4 && 0 != a % 100 || 0 == a % 400
        }, o: function () {
            return parseInt(this.getFullYear())
        }, Y: function () {
            return parseInt(this.getFullYear())
        }, y: function () {
            return parseInt((this.getFullYear() + "").substr(-2))
        }, a: function () {
            return 12 <= this.getHours() ? "pm" : "am"
        }, A: function () {
            return 12 <= this.getHours() ?
                "PM" : "AM"
        }, B: function () {
            return "@" + ("00" + Math.floor((60 * ((this.getHours() + 1) % 24 * 60 + this.getMinutes()) + this.getSeconds() + .001 * this.getMilliseconds()) / 86.4)).slice(-3)
        }, g: function () {
            var a = this.getHours();
            return 0 == a ? 12 : 12 >= a ? a : a - 12
        }, G: function () {
            return this.getHours()
        }, h: function () {
            var a = this.getHours(), a = 12 >= a ? a : a - 12;
            return 0 == a ? 12 : 9 < a ? a : "0" + a
        }, H: function () {
            var a = this.getHours();
            return 9 < a ? a : "0" + a
        }, i: function () {
            var a = this.getMinutes();
            return 9 < a ? a : "0" + a
        }, s: function () {
            var a = this.getSeconds();
            return 9 <
            a ? a : "0" + a
        }, u: function () {
            return this.getMilliseconds()
        }, e: function () {
            var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 1 < a.length ? a[1] : ""
        }, I: function () {
            var a = new Date(this.getFullYear(), 0, 1), b = new Date(this.getFullYear(), 6, 1),
                a = Math.max(a.getTimezoneOffset(), b.getTimezoneOffset());
            return this.getTimezoneOffset() < a ? 1 : 0
        }, O: function () {
            var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 2 < a.length ? a[2] : ""
        }, P: function () {
            var a = this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
            return 2 < a.length ? a[2].substr(0, 3) + ":" + a[2].substr(3, 2) : ""
        }, T: function () {
            return this.toLocaleString("en", {timeZoneName: "short"}).split(" ").pop()
        }, Z: function () {
            return 60 * this.getTimezoneOffset()
        }, c: function () {
            return l(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString()
        }, r: function () {
            return l(new Date(this), -(this.getTimezoneOffset() / 60)).toISOString()
        }, U: function () {
            return this.getTime() / 1E3 | 0
        }
    }, e = {
        commonLogFormat: "d/M/Y:G:i:s",
        exif: "Y:m:d G:i:s",
        isoYearWeek: "Y\\WW",
        isoYearWeek2: "Y-\\WW",
        isoYearWeekDay: "Y\\WWj",
        isoYearWeekDay2: "Y-\\WW-j",
        mySQL: "Y-m-d h:i:s",
        postgreSQL: "Y.z",
        postgreSQL2: "Yz",
        soap: "Y-m-d\\TH:i:s.u",
        soap2: "Y-m-d\\TH:i:s.uP",
        unixTimestamp: "@U",
        xmlrpc: "Ymd\\TG:i:s",
        xmlrpcCompact: "Ymd\\tGis",
        wddx: "Y-n-j\\TG:i:s"
    }, h = {
        AMERICAN: "F j, Y",
        AMERICANSHORT: "m/d/Y",
        AMERICANSHORTWTIME: "m/d/Y h:i:sA",
        ATOM: "Y-m-d\\TH:i:sP",
        COOKIE: "l, d-M-Y H:i:s T",
        EUROPEAN: "j F Y",
        EUROPEANSHORT: "d.m.Y",
        EUROPEANSHORTWTIME: "d.m.Y H:i:s",
        ISO8601: "Y-m-d\\TH:i:sO",
        LEGAL: "j F Y",
        RFC822: "D, d M y H:i:s O",
        RFC850: "l, d-M-y H:i:s T",
        RFC1036: "D, d M y H:i:s O",
        RFC1123: "D, d M Y H:i:s O",
        RFC2822: "D, d M Y H:i:s O",
        RFC3339: "Y-m-d\\TH:i:sP",
        RSS: "D, d M Y H:i:s O",
        W3C: "Y-m-d\\TH:i:sP"
    }, f = {
        "pretty-a": "g:i.sA l jS \\o\\f F, Y",
        "pretty-b": "g:iA l jS \\o\\f F, Y",
        "pretty-c": "n/d/Y g:iA",
        "pretty-d": "n/d/Y",
        "pretty-e": "F jS - g:ia",
        "pretty-f": "g:iA",
        "pretty-g": "F jS, Y",
        "pretty-h": "F jS, Y g:mA"
    };
    if (c) {
        if ("compound" == c) {
            if (!1 === k) return e;
            var d = {}, b;
            for (b in e) d[b] = dateFormat(g, e[b]);
            return d
        }
        if (e[c]) return dateFormat(g,
            e[c], k);
        if ("constants" == c) {
            if (!1 === k) return h;
            d = {};
            for (b in h) d[b] = dateFormat(g, h[b]);
            return d
        }
        if (h[c]) return dateFormat(g, h[c], k);
        if ("pretty" == c) {
            if (!1 === k) return f;
            d = {};
            for (b in f) d[b] = dateFormat(g, f[b]);
            return d
        }
        if (f[c]) return dateFormat(g, f[c], k);
        e = c.split("");
        h = "";
        for (b in e) (f = e[b]) && /[a-z]/i.test(f) && !/\\/.test(h + f) && (e[b] = d[f] ? d[f].apply(g) : f), h = e[b];
        return e.join("").replace(/\\/g, "")
    }
    return g
};