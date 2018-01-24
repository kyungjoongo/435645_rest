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
const mysql = require('nodejs-mysql').default;
const config = {
    host: '35.201.132.249',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}


const connection = mysql.getInstance(config)

//###############################
router.get('/get_receipe', function (req, last_response, next) {

    var page = req.query.page;
    var table_name = req.query.table_name;
    var search_word = req.query.search_word
    //var query = req.query.query;
    var offset = (page - 1) * 10;


    if (search_word == undefined) {
        search_word = ''
    }


    let sql = ''
    if (search_word != '') {

        /*select * from receipe_list_yoon where title like '%잡채%'  LIMIT 10 offset 10*/
        sql = 'select * from ' + table_name + '  where title like "%' + search_word + '%"  LIMIT 10 offset ' + offset
    } else {
        sql = 'select * from ' + table_name + '  LIMIT 10 offset ' + offset
    }


    connection.exec(sql).then(rows => {

        last_response.json(rows)


    });


});


module.exports = router;
