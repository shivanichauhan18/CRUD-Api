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

app.get("/exercise/get",function(req,res){
    data=fs.readFileSync("exercise.json")
    var Data=JSON.parse(data);
    console.log(Data);
    return res.send(Data)
})

app.get("/exercise/get/:id",function(req,res){
    CoursesId=req.params.id;
    mainData=[];
    var data=fs.readFileSync("exercise.json")
    var Data=JSON.parse(data)
    for (var i in Data){
        if (Data[i]["coursesId"]==CoursesId){
            console.log(Data[i]);
            mainData.push(Data[i]);
        }
    }res.json(mainData);
});

body.get("/courses/:courseID/exercise/:id",function(req,res){
    var courseId=req.params.courseID;
    var data=fs.readFileSync("exercise.json")
    var Data=JSON.parse(data);
    for(var i in Data){
        if (Data[i]["coursesId"] == courseId){
            var id=req.params.id;
            for (var j in Data){
                if (Data[j]["id"] == id && Data[j]["coursesId"] == courseId){
                var exercisData = (Data[j])
                res.send(JSON.stringify(exercisData))
            }
        }
    }
    }
    res.end("Data not found")

});


body.put("/courses/:courseId/exercise/:id",function(req,res){
    courseID=req.params.CoursesId;
    id=req.params.id;
    var data=fs.readFileSync("exercise.json")
    var Data=JSON.parse(data)  
    for (var i in Data){
        if (Data[i]["coursesId"] == courseID && Data[i]["id"] == id){
        Data[id]["name"]=req.body.name;
        Data[id]["description"]=req.body.description;    
        fs.writeFileSync("exercise.json",null,2)
        res.send(Data)

        }
    }
});

body.post("/courses/:courseId/exercise/:id",function(req,res){
    var cId =req.params.courseId;
    var eid=req.params.id;
    var user = 
    {       
           codeUrl : req.body.codeUrl,
           userName : req.body.userName,
        }

    var data=fs.readFileSync("submission.json");
    data = data.toString();
    var Data = JSON.parse(data);
    var id=Data.length
     
    integerId=parseInt(eid,10)
    intCourseId=parseInt(cId,10)
    user["submissionId"]=id+1
    user["courseId"]=intCourseId;
    user["exerciseId"]=integerId
    Data.push(user);

    fs.writeFileSync("submission.json",JSON.stringify(Data,null,2))
    return res.json(Data)

        
    })
//     body.get("/courses",function(req,res){
//         var data=fs.readFileSync("submission.json")
//         var Data=JSON.parse(data)
//         console.log(Data)
//         res.json(Data)

// })




app.listen(8000, () => console.log('server is listening'));

