var express = require('express');
var app = express();
var client_id = 'NJ52okBkv2Fg5CGklQif';
var client_secret = '30vmVQ0p79';
var fs = require('fs');
const fileUpload = require('express-fileupload');
app.use(fileUpload());



app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    let name = req.files.file.name;

    let baseUrl = 'e:/upload/'

    console.log('##############'+ name);

    console.log( sampleFile);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl+ name, function(err) {
        if (err){

            console.log('##############애러다');
            return res.status(500).send(err);
        }


        //res.send('File uploaded!');

        var request = require('request');
        var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

        var _formData = {
            image: 'image',
            image: fs.createReadStream(baseUrl+ name)
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
        _req.pipe(res); // 브라우저로 출력
    });
});



app.get('/face', function (req, res) {
    var request = require('request');
    var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
    //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

    var _formData = {
        image: 'image',
        image: fs.createReadStream('e:/upload/' + '1517869512868.jpg')
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





app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/face app listening on port 3000!');
});