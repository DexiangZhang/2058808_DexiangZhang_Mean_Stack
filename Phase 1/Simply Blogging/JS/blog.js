
function addBlog() {
    let title = document.querySelector("#title_name").value;
    let info = document.querySelector("#detail").value;
    let image = document.querySelector("#image_URL").value;
    
    // all info are set
    if(title.length !=0 && info.length !=0 && image.length !=0) {

        let content = "";
        let img = "<img class='card-img-top' src='" + image + "'/>";
        let innerDiv = "<div class='card-body'>";
        let name = " <h5 class='card-title'>" + title +"</h5>";
        let pTag = "<p class='card-text'>" + info + "</p>";
        let innerDivClose = " </div>";

        let button = document.querySelector(".form-group");
       
        content = img + innerDiv + name + pTag + innerDivClose;

        var newDiv = document.createElement("div");
        newDiv.className ="card";

        newDiv.innerHTML = content;
        document.querySelector(".card_section").appendChild(newDiv);

        button.reset();
  
        
    } else {
        alert("Make Sure You Filled All the Information Before You Add")
    }

   
}

