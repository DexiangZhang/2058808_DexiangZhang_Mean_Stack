"use strict";
function itemsDisplay() {
    let details = JSON.parse(sessionStorage.getItem("totalItems") || "{}");
    let totalCost = 0.00;
    let tableContent = "";
    let startTable = "<table class='table table-striped'><tr><th>Item Name</th><th>Price</th></tr>";
    let endTable = "</table>";
    let statement;
    for (let i = 0; i < details.length; i++) {
        let amountInNum = parseFloat(details[i].cost);
        tableContent += `<tr><td>${details[i].name}</td><td>$${amountInNum.toLocaleString()}</td></tr>`;
        totalCost += amountInNum;
    }
    statement = `Total Cost: $${totalCost.toLocaleString()}`;
    tableContent = startTable + tableContent + endTable;
    document.querySelector("#table").innerHTML = tableContent;
    document.querySelector("#cost").innerHTML = statement;
}
