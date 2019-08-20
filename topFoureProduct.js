/*var fs = require('fs');
var express = require('express');
var readline = require('readline');
var stream = require('stream');
var app = express();

app.get('/', function (req, res) {
    var holeData;
    var myurl="https://www.amazon.in/s?k=shoes&ref=nb_sb_noss";
    
    request(myurl, function(error, response, data) {
    
});

});

var request = require("request");
var body;


request("http://www.stackoverflow.com", function(error, response, data) {
    body = data;
    console.log(body);
});
*/





var request = require("request");
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

var myurl="https://www.amazon.in/s?k=shoes&ref=nb_sb_noss";
request(myurl, function(error, response, data) {
    body.data = data;
    body.emit('update');
});

body.on('update', function () {
    console.log(body.data); 

});















