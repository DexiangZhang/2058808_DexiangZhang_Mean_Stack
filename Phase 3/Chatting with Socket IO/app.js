let express = require('express');
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let resArray = [
   "Yes I’m a robot but I’m a smart one!",
   "I'm fine. How are you doing today?",
   "You're Welcome",
   "Awesome",
   "Good to hear that! Happy birthday! ",
   "Have a nice day! GoodBye!",
   "Hello",
   "Mmhmm, I don't have the answer yet. Sorry!",
];

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

    socket.on("data", (msg) => {

        msg = msg.toLowerCase();

        if(msg.includes("hi") || msg.includes("hello")) {

            socket.emit("response", resArray[6]);

        } else if (msg.includes("robot")) {

            socket.emit("response", resArray[0]);

        } else if (msg.includes("how are you")) {
           
            socket.emit("response", resArray[1]);

        } else if (msg.includes("fine")) {
           
            socket.emit("response", resArray[3]);

        } else if (msg.includes("my birthday")) {
            
            socket.emit("response",resArray[4]);

        } else if (msg.includes("see you") || msg.includes("goodbye") || msg.includes("bye")) {
            
            socket.emit("response",resArray[5]);

        } else if (msg.includes("thank")) {
        
            socket.emit("response", resArray[2]);

        } else {
            
            socket.emit("response", resArray[7]);

        }
    });
});

http.listen(8080, () => {
    console.log("server running on port number 8080");
});