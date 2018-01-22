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
    host: '104.155.228.134',
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
    //var query = req.query.query;
    var offset = (page - 1) * 10 ;

    if (table_name ==undefined){
        table_name= 'receipe_list'
    }


    /*select * from receipe_list  LIMIT 10 offset 0
    select * from receipe_list  LIMIT 10 offset 10
    select * from receipe_list  LIMIT 10 offset 20*/


    connection.exec('select * from '+ table_name+ '  LIMIT 10 offset '+ offset).then(rows => {

        last_response.json(rows)


    });



});


module.exports = router;
