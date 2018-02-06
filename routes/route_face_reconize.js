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
var fs = require('fs');


router.post('/face_upload/', function (req, last_response, next) {

    var client_id = 'NJ52okBkv2Fg5CGklQif';
    var client_secret = '30vmVQ0p79';


    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    let name = req.files.file.name;

    // let baseUrl = 'e:/upload/'
    let baseUrl = './upload/'
    let fixedName = 'temp_image.jpg'

    console.log('##############' + name);

    console.log(sampleFile);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {

            console.log('##############애러다');
            return last_response.status(500).send(err);
        }


        //res.send('File uploaded!');

        var request = require('request');
        var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

        var _formData = {
            image: 'image',
            image: fs.createReadStream(baseUrl + fixedName)
            //image: fs.createReadStream(sampleFile)
        };


        var _req = request.post({
            url: api_url, formData: _formData,
            headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
        }).on('response', function (response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type'])
        });
        console.log(request.head);
        _req.pipe(last_response); // 브라우저로 출력
    });
});

//##############################################

router.get('/naver_image/', function (req, last_response, next) {

    var query = req.query.query;

    var api_url = 'https://openapi.naver.com/v1/search/image?display=10&start=1' + '&sort=sim&query=' + encodeURI(query); // json 결과
    var striptags = require('striptags');
    var prettyjson = require('prettyjson');


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var blogArrray = JSON.parse(body);


        for (var i = 0; i < blogArrray.items.length; i++) {


            console.log('##############' + striptags(blogArrray.items[i].title))

            var title = striptags(blogArrray.items[i].title);

            var link = blogArrray.items[i].link.replace('&amp;', '&')


            blogArrray.items[i].title = title;
            blogArrray.items[i].link = link;

        }


        console.log(prettyjson.render(blogArrray.items, {noColor: true}));
        last_response.json(blogArrray.items)
    });
});



router.get('/face', function (req, res) {

    var client_id = 'NJ52okBkv2Fg5CGklQif';
    var client_secret = '30vmVQ0p79';
    var request = require('request');
    var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
    //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

    var _formData = {
        image: 'image',
        image: fs.createReadStream('e:/upload/' + '1.jpg')
    };


    var _req = request.post({
        url: api_url, formData: _formData,
        headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    }).on('response', function (response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type'])

        console.log(response.body);
    });
    console.log(request.head);
    _req.pipe(res); // 브라우저로 출력
});



module.exports = router;
