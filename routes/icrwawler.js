var icrawler = require('icrawler');

var opts = {
    concurrency: 10,
    errorsFirst: true,
    proxyRandom : true,
    agentRandom: true,
    reverseProxyRandom: true


};


var str = '집밥 백선생 레시피 모음'
var qs = require('querystring');
var encodedStr = qs.escape(str);


var url='https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
    '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+'&start='+ 11;



icrawler(url, opts, function(url, $, _){

    $('.thumb').each(function() {
        _.step();
        _.save({
            title: $(this).text(),
            href: $(this).children().attr('href')
        })
    });
}, function(result){
    console.log(result);
});