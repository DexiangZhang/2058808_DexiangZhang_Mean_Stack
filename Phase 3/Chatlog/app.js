let express = require('express');
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

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

let chatSchema = mongoose.Schema({
    _id:Number,
    name:String,
    message:String,
});

let chartModel = mongoose.model("Chatlog",chatSchema);

let counter = 0;

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    // receive data from client side
    socket.once("name", (fullName) => {

        socket.once("message", (msg) => {

            
            chartModel.countDocuments({}, function( err, total){
                
                if(total ==0) {
                   counter = counter + 1;
                } else {
                    counter = total + 1;
                }
        
                let data = new chartModel({_id: counter, name: fullName, message : msg});

                chartModel.insertMany(data,(err,result)=> {
                    if(!err){
                       console.log(`ID #${counter} added to database`);
                    }else {
                        console.log("Something Wrong! Please Try Again!");
                    }
                });
            });
        });
    });
});


http.listen(8080, () => {
    console.log("server running on port number 8080");
});