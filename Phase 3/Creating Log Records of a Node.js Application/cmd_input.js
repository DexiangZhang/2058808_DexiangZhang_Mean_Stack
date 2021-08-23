debugger;
function readAndWrite() {
   
    let readline = require("readline-sync");
    let fs = require("fs");

    let userInfo = [];
    let fileName = "./usersInformation.json";
    let exist = false;
    
    debugger;

    while(exist==false) {

        let fName = readline.question("Enter Your First Name: ");
        let lName = readline.question("Enter Your Last Name: ");
        let gender = readline.question("Enter Your Gender: ");
        let email = readline.questionEMail("Enter Your Email Address: ");
        let time = new Date().toLocaleString();
    
        let user = {
            firstName: fName,
            lastName: lName,
            userGender: gender,
            userEmail: email,
            currentTime: time,
        };

        userInfo.push(user);

        let done = readline.question("Exit? (Y/N): ");

        if(done == "y" || done == "Y") {
            exist = true;
        } 

        if(fs.existsSync(fileName)) {
        
            let existInfo = JSON.parse(fs.readFileSync(fileName).toString());
            existInfo.push(user);
            fs.writeFileSync(fileName, JSON.stringify(existInfo));
    
        } else {
    
            let data = JSON.stringify(userInfo);
            fs.writeFileSync(fileName, data);
        }  
    }
  
}
debugger;
readAndWrite();