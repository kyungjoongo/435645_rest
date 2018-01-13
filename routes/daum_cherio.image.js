var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");


var axios = require('axios');


getImage();

function getImage() {

    var query = '백종원도 반한 대패두루치기 만들기 집밥백선생 레시피'

    var querystring = require('querystring');
    var encodedQuery = querystring.escape(query);
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

    /*const wes = await axios('https://api.github.com/users/wesbos');
    console.log(wes.data); // mediocre code*/

    let responseJson =instance.get().then(responseJson=>{

        console.log('##############'+ JSON.stringify(responseJson.data.documents[0].image_url));

        return JSON.stringify(responseJson.data.documents[0].image_url);
    });


}


/*
    .then(res=> res).then(reponseJson=>{

        console.log('##############'+ JSON.stringify(reponseJson.data.documents[0].image_url));

    });
*/
