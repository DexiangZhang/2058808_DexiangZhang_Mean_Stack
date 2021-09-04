let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// tcs_mean is user_created database

let url = "mongodb://localhost:27017/tcs_mean";

mongoose.pluralize(null);   

mongoose.connect(url)
    .then(res=>{
        console.log("connected")
    })
    .catch(err=> {
        console.log(err)
    })

let courseSchema = mongoose.Schema({
    _id:Number,
    name:String,
    detail:String,
    fee: Number
});

let courseModel = mongoose.model("Course",courseSchema);



app.get("/",(req,res)=> {
    res.sendFile(`${__dirname}/html/index.html`);
});

app.get("/add",(req,res)=> {
    res.sendFile(`${__dirname}/html/add.html`);
});

app.get("/update",(req,res)=> {
    res.sendFile(`${__dirname}/html/update.html`);
});

app.get("/delete",(req,res)=> {
    res.sendFile(`${__dirname}/html/delete.html`);
});

app.get("/fetch",(req,res)=> {
    res.sendFile(`${__dirname}/html/fetch.html`);
});  


// act like the app.put since form there is no method of update
app.post("/updateFee", (req, res) => {
    let course = req.body;
    courseModel.updateOne({_id:course._id},{$set:{fee:course.fee}},(err,result)=> {
        if(!err){
            if(result.modifiedCount>0 || result.matchedCount>0) {
                res.sendFile(`${__dirname}/html/update.html`);
            } else {
                res.send("Updated Failed! Course ID Not Found");
            }
           
            
        }else {
            res.send("Updated Failed! Something Wrong Here! Please Check the Both Input");
        }
    })
});

app.post("/adding", (req, res) => {
    let course = req.body;
    
   courseModel.insertMany(course,(err,result)=> {
    if(!err){
        res.sendFile(`${__dirname}/html/add.html`);
    }else {
       res.send("Insert Failed! Make Sure Not Duplicate Course ID");
    }
   });

});

// act like app.delete, since form has no delete http method 
app.get("/deleteCourse", (req, res) => {

    let id = req.query._id;
    
    courseModel.deleteOne({_id:id},(err,result)=> {
        if(!err){
            if(result.deletedCount>0){
                res.sendFile(`${__dirname}/html/delete.html`);
            }else {
                res.send("Course ID NOT Existed!");
            }
        }else {
            res.send("Deleted Failed! Please Check Your Input!")
        }
    })
});


// for fetch purpose, that show dynamcally table data, by communicate with html file
io.on("connection", (socket) => {

    courseModel.find({},(err,data)=> {
        if(!err){
            socket.emit("allCourse", data);
        }else {
            res.send("Something Wrong! Please Try Again!")  
        }
    })

    
});


http.listen(8080,()=>console.log("Server running on port number 8080"));