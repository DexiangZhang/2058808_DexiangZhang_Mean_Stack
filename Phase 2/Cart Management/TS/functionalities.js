"use strict";
let info = new Array();
let items = 0;
function add(index) {
    if (info.length == 0) {
        let items = JSON.parse(sessionStorage.getItem("totalItems") || "[]");
        info = items;
    }
    let title;
    let price;
    if (index == 1) {
        title = document.querySelector("#item_1").innerHTML;
        price = document.querySelector("#price_1").innerHTML;
    }
    else if (index == 2) {
        title = document.querySelector("#item_2").innerHTML;
        price = document.querySelector("#price_2").innerHTML;
    }
    else if (index == 3) {
        title = document.querySelector("#item_3").innerHTML;
        price = document.querySelector("#price_3").innerHTML;
    }
    else {
        title = document.querySelector("#item_4").innerHTML;
        price = document.querySelector("#price_4").innerHTML;
    }
    let itemObj = {
        name: title,
        cost: price,
    };
    info.push(itemObj);
    sessionStorage.setItem("totalItems", JSON.stringify(info));
    items = items + 1;
    sessionStorage.setItem("itemAmount", JSON.stringify(items));
    displayCount();
}
function displayCount() {
    if (items == 0) {
        let amount = JSON.parse(sessionStorage.getItem("itemAmount") || '0');
        items = amount;
    }
    let display = document.querySelector("#amount");
    display.innerHTML = items;
}
displayCount();
