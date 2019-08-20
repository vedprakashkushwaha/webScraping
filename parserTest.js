var HTMLParser = require('node-html-parser');
var request = require("request");
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
var myurl="https://www.amazon.in/s?k=shoes&ref=nb_sb_noss";
request(myurl, function(error, response, data) {
    body.data = data;
    body.emit('update');
});

body.on('update', function () {
    //console.log(body.data); 
  
    //var root = HTMLParser.parse(body.data);
    var words=body.data.split(" ");
    var m="class=\"s-image\"";
    var j=0;
    var detail = [];
    for(var i=0;words.length>i;i++)
    {
        if(words[i][0]==='c' && words[i].length===16 && words[i][13]==='e')
        {
            var k=0;
            var productName="";
            var image="";
            while(k<90)
            {
                i++;
                if(words[i]!==" " && words[i]!=='\n')
                {
                    var l=words[i].length;
                    if(l>10 && words[i][l-4]=='.')
                    {
                        image=image+words[i]+"\"";
                        break;
                    }
                    productName=productName + " " + words[i].trim()
                }
                k++;
            }
            
            
            detail.push({
                "productName": productName.split('"')[1],
                "productImageUral": image.split('"')[1],
                "productPrice": "none",
                "bestProductReview":"none"
            });
            j++;
            if(j>3)
            break;
        }
       
    } 
    console.log(detail);

});
