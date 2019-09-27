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

// Read data

body.get("/get",function(req,res){
    var data=fs.readFileSync("courses.json")
    var Data = JSON.parse( data );
    console.log(Data);
    res.send(Data);
})

// show data by Id
body.get("/get/:name",function(req,res){
    id = req.params.name
    var data=fs.readFileSync("courses.json")
    var Data=JSON.parse(data);
    for (var i in Data){
        if(Data[i]["name"]==id){
        console.log(Data[i])
        res.send(JSON.stringify(Data[i]));
        }
    }
});

// deleting data

body.delete("/delete/:id",function(req,res){
    id=req.params.id
    data=fs.readFileSync("courses.json")
    var Data=JSON.parse(data);
    for (var i in Data){
        if(Data[i]["id"]==id){
            delete Data[i]
            fs.writeFileSync("courses.json",JSON.stringify(Data,null,2))
            console.log(Data)
            res.json(Data)
        };
    };
});

// put data
body.put("/put/:id",function(req,res){
    id=req.params.id-1;
    var data=fs.readFileSync("courses.json")
    var Data=JSON.parse(data);

    Data[id]["name"]=req.body.name;
    Data[id]["description"]=req.body.description

    fs.writeFileSync("courses.json",JSON.stringify(Data,null,2))
    console.log(Data);
    return res.json(Data)
});

// CREATING DATA
body.post('/exercise/post', function (req, res) {
    var user = 
    {       
           coursesId:req.body.coursesId,
           name : req.body.name,
           description : req.body.description,
           hint:req.body.hint,
           content:req.body.content
        }
     var data=fs.readFileSync("exercise.json") 
     console.log(data)
     data = data.toString();
     var Data = JSON.parse(data);
     var id=Data.length

     user["id"]=id+1
     Data.push(user);

     fs.writeFileSync("exercise.json",JSON.stringify(Data,null,2))
     return res.json(Data)
 });


app.listen(8000, () => console.log('server is listening'));

