var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");
var querystring = require('querystring');
var prettyjson = require('prettyjson');

var query = '명언+용기'
var encodedQuery = querystring.escape(query);
var page = 1;
var striptags = require('striptags');
var axios = require('axios');
var Sync = require('sync');


for ( let i=1; i<=5; i++){
}
 //   getReceipeList(i)


getReceipeList(1,'용기+명언')

 function getReceipeList(page, query) {


     request({
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
            , 'Content-Type': 'application/json;charset=UTF-8'
        },
        encoding: null,
        uri: 'https://dapi.kakao.com/v2/search/image?query=' + encodeURI(query) + '&page=' + page + '&size=10',
        method: 'GET'
    }, function (err, res, body) {


        var jsonArray = JSON.parse(body);

        let dataJson = jsonArray.documents;
        var _dateJSons = [];

        for (var i = 0; i < dataJson.length; i++) {

            let image_url =  encodeURI(dataJson[i].image_url)

            image_url_arr = image_url.split('type=');

            if ( image_url_arr.length==2){
                image_url = image_url_arr[0] + "type=w966";
            }


            dataJson[i].image_url = image_url;

        }
        console.log(prettyjson.render(dataJson), {noColor: true});

    });
}

/*


function getImage() {

    var querystring = require('querystring');
    var prettyjson = require('prettyjson');

    var instance = axios.create({
        baseURL: 'https://dapi.kakao.com/v2/search/image?query=' + encodedQuery + '&page=1&size=10',
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'json'
    });

    /!*const wes = await axios('https://api.github.com/users/wesbos');
    console.log(wes.data); // mediocre code*!/

    let responseJson =await instance.get();
    console.log('##############'+ JSON.stringify(responseJson.data.documents[0].image_url));

    return JSON.stringify(responseJson.data.documents[0].image_url);

}




////////////////////
function httpGet(url){
    var options = {
        url: 'https://dapi.kakao.com/v2/search/image?query=' + encodedQuery + '&page=1&size=10',
        method: 'GET',
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    request(options, function (error, response, body) {
        if (!error) {
            console.log("Status Code (function) : "+response.statusCode);
            return response.statusCode;
        }
        else
        {
            console.log("Error!!");
        }
    });
}



*/
