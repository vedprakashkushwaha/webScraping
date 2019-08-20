var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
var app = express();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/inputForParse.html');
});



app.post('/search_product', urlencodedParser, function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var myurl = "https://www.amazon.in/s?k=" + req.body.item + "&ref=nb_sb_noss";
    request(myurl, function(error, response, data) {
        body.data = data;
        body.emit('update');
    });


    request(myurl, function (error, response, data) {
        body.data = data;
        body.emit('update');
    });

    body.on('update', function () {
        var words = body.data.split(" ");
        var m = "class=\"s-image\"";
        var j = 0;
        var detail = [];
        for (var i = 0; words.length > i; i++) {
            if (words[i][0] === 'c' && words[i].length === 16 && words[i][13] === 'e') {
                var k = 0;
                var productName = "";
                var image = "";
                while (k < 90) {
                    i++;
                    if (words[i] !== " " && words[i] !== '\n') {
                        var l = words[i].length;
                        if (l > 10 && words[i][l - 4] == '.') {
                            image = image + words[i] + "\"";
                            break;
                        }
                        productName = productName + " " + words[i].trim()
                    }
                    k++;
                }


                detail.push({
                    "productName": productName.split('"')[1],
                    "productImageUral": image.split('"')[1],
                    "productPrice": "none",
                    "bestProductReview": "none"
                });
                j++;
                if (j > 3)
                    break;
            }

        }
        console.log(detail);

    });

















    res.write("<br/>my url: " + detail[1].productName+ "<br/>");
    res.end("");
});
app.listen(2324);