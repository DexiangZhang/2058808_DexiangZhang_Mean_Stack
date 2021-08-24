let http = require("http");
let url = require("url");
let fs = require("fs");

let indexPage = ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>

    <style>
      body {
        text-align: center;
        font-size: 2em;
        margin-top: 10rem;
        background-color: beige;
      }
    </style>
</head>
<body>

    <h1>Task Planner </h1>
    <div>
        <a href="AddTask">Add New Task</a><br/><br/>
        <a href="DeleteTask">Delete Old Task</a><br/><br/>
        <a href="ShowTask">Show Task Table</a><br/><br/>
    </div>
    </div>
</body>
</html>
`;

let addPage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Add Task</title>

    <style>
      body {
        text-align: center;
        margin-top: 5rem;
        background-color: beige;
      }

      h2 {
        font-size:4em;
        color: tomato;
      }
      
      form {
        font-size:1.3em;
      }
      
      label {
        font-size: 1.1em;
      }

      input {
        font-size:1.1em;
      }

      a {
        font-size:1.6em;
      }
    </style>
  </head>
  <body>
    <h2>Add Task</h2>
    <form action="addNewTask">
      <label>Employee ID</label>
      <input type="number" name="empID"/><br /><br />
      <label>Task ID</label>
      <input type="number" name="taskID" /><br /><br />
      <label>Task</label>
      <input type="text" name="taskInfo" "/><br /><br />
      <label>Deadline</label>
      <input type="date" name="time" /><br /><br />

      <input type="submit" value="Add" />
      <input type="reset" value="Clear" /> <br /><br />
      
    </form>
    <a href='indexPage'>Home Page</a>
  </body>
</html>
`;

let delPage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Delete Task</title>

    <style>
      body {
        text-align: center;
        margin-top: 5rem;
        background-color: beige;
      }

      h2 {
        font-size:4em;
        color: tomato;
      }
      
      form {
        font-size:1.3em;
      }

      label {
        font-size: 1.1em;
      }

      input {
        font-size:1.1em;
      }

      a {
        font-size:1.6em;
      }
    </style>

  </head>
  <body>
    <h2>Delete Task</h2>
    <form action="deleteInfo">
        
      <label>Task ID</label>
      <input type="number" name="taskID"/><br /><br />

      <input type="submit" value="Delete"/>
      <input type="reset" value="Clear" /> <br /><br />
    </form>
    <a href='indexPage'>Home Page</a>
  </body>
</html>
`;

let tablePage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Display Task</title>

    <style>
      body {
        text-align: center;
        margin-top: 5rem;
        background-color: beige;
      }

      h2 {
        font-size:4em;
        color: tomato;
      }

      a {
        font-size:1.6em;
      }

      th, td {
        padding: 0.5rem;
      }

      table {
        border: 2px solid black; 
        margin-left: auto;
        margin-right:auto;
        font-size: 1.3em;
      }
    </style>
  </head>
  <body>
    <h2>Display All Task</h2>
  </body>
</html>
`;

let taskInfo = [];
let fileName = "./tasks.json";

let server = http.createServer( (request,response)=> {

    let urlInfo = url.parse(request.url,true);
   
    if(urlInfo.path != "/favicon.ico"){

        // react differently based on the path url 
        if(urlInfo.path == "/AddTask"){

          response.writeHead(200,{"content-type":"text/html"});
          response.write(addPage);

        } else if(urlInfo.path == "/DeleteTask"){

            response.writeHead(200,{"content-type":"text/html"});
            response.write(delPage);

        } else if(urlInfo.path == "/ShowTask"){

            response.writeHead(200,{"content-type":"text/html"});

            let tableContent="";
            let startTable = `<table border="1"><tr><th>Employee ID</th><th>Task ID</th><th>Task</th><th>Deadline</th></tr>`;
            let endTable="</table><br />";
            // array of object in javascript
            if(fs.existsSync(fileName)) {

              let existInfo = JSON.parse(fs.readFileSync(fileName).toString());

              for(let i=0; i<existInfo.length; i++) {
                tableContent +=`<tr><td> ${existInfo[i].empID} </td> <td> ${existInfo[i].taskID} </td><td> ${existInfo[i].taskInfo} </td><td> ${existInfo[i].time} </td></tr>`;
              }
            }
            tableContent = startTable + tableContent + endTable;

            response.write(tablePage);
            response.write(tableContent);
            response.write(`<a href="indexPage">Home Page</a>`);
        
        // trigger when user click add button at the addTask HTML page
        } else if(urlInfo.pathname == "/addNewTask") {

            response.writeHead(200,{"content-type":"text/html"});

            let info = urlInfo.query;

            if(fs.existsSync(fileName)) {
        
                let existInfo = JSON.parse(fs.readFileSync(fileName).toString());
        
                let result = existInfo.find(obj=> obj.taskID == info.taskID);
        
                // not found in the existing array, 
                if(result == undefined){
        
                    existInfo.push(info);
                    fs.writeFileSync(fileName, JSON.stringify(existInfo));

                    response.write("<p style='color: green; font-size: 2em;'> Successfully Add New Task! </p>"); 
                    response.write(addPage);
        
                } else {
                    response.write("<p style='color: red; font-size: 2em;'>Failure! Please Enter Unique Task ID </p>");   
                    response.write(addPage);  
                }
        
            } else {
                taskInfo.push(info);

                let data = JSON.stringify(taskInfo);
                fs.writeFileSync(fileName, data);

                response.write("<p style='color: green; font-size: 2em;'> Successfully Add New Task! </p>"); 
                response.write(addPage);
            }  

        // trigger when user click delete button at delete HTML page
        } else if(urlInfo.pathname == "/deleteInfo") {

            response.writeHead(200,{"content-type":"text/html"});

            let delInfo = urlInfo.query;

            let data = JSON.parse(fs.readFileSync(fileName).toString());
        
            let res = data.find(obj=> obj.taskID == delInfo.taskID);
            
            // find the data inside the json file
            if(res != undefined){

                let newData = data.filter( task => task.taskID != res.taskID); 

                fs.writeFileSync(fileName, JSON.stringify(newData));

                response.write("<p style='color: green; font-size: 2em;'> Successfully Delete the Task! </p>"); 
                response.write(delPage);

            } else {
                response.write("<p style='color: red; font-size: 2em;'>Failure! Please Enter Valid Task ID </p>");   
                response.write(delPage);  
            }

        // any other URL pathname that is not liste above, will go to default page, Index HTML page
        } else {
            response.writeHead(200,{"content-type":"text/html"});
            response.write(indexPage);  
        }
    }
    response.end();
});

server.listen( 8080, () => {
  console.log("Server running on port number 8080")
});





