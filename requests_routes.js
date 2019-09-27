var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
var body=app.use(bodyParser.json());

body.post('/post', function (req, res) {
    var user = 
    {
           name : req.body.name,
           description : req.body.description
        }
     var data=fs.readFileSync("courses.json") 
     console.log(data)
     data = data.toString();
     var Data = JSON.parse( data );
     var id=Data.length

     user["id"]=id+1
     Data.push(user);

     fs.writeFileSync("courses.json",JSON.stringify(Data,null,2))
     return res.json(Data)
 });

app.listen(8000, () => console.log('server is listening'));
