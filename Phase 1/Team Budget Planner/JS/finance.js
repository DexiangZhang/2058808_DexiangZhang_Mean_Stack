function displayTable() {

    let detailsJSON = sessionStorage.getItem("programsDetail");
    let programs = JSON.parse(detailsJSON);

    let tableContent="";
    let startTable ="<table><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    let endTable="</table>";

    let totalCost =0;
    let statement;
   
    for(let i=0; i<programs.length; i++) {

        let amountInNum = parseInt(programs[i].budget);

        tableContent +="<tr><td>"+programs[i].client+"</td><td>"+programs[i].project+"</td><td>$"+amountInNum.toLocaleString()+"</td></tr>";

        totalCost= totalCost + amountInNum;
    }

    statement= `Total Budget: $${totalCost.toLocaleString()}`;
    
    tableContent = startTable + tableContent + endTable;


    document.querySelector("#detail_table").innerHTML= tableContent;
    document.querySelector("#total_budget").innerHTML = statement;
 
}
