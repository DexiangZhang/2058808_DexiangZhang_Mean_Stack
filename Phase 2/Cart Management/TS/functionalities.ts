let info: Array<any> = new Array<any>();
let items: any = 0;

function add(index: number): void {

    if (info.length == 0) {

        let items = JSON.parse(sessionStorage.getItem("totalItems") || "[]");
        info = items;
    }

    let title: any;
    let price: any;

    if (index == 1) {
        title = (document.querySelector("#item_1") as HTMLInputElement).innerHTML;
        price = (document.querySelector("#price_1") as HTMLInputElement).innerHTML;
    } else if (index == 2) {
        title = (document.querySelector("#item_2") as HTMLInputElement).innerHTML;
        price = (document.querySelector("#price_2") as HTMLInputElement).innerHTML;
    } else if (index == 3) {
        title = (document.querySelector("#item_3") as HTMLInputElement).innerHTML;
        price = (document.querySelector("#price_3") as HTMLInputElement).innerHTML;
    } else {
        title = (document.querySelector("#item_4") as HTMLInputElement).innerHTML;
        price = (document.querySelector("#price_4") as HTMLInputElement).innerHTML;
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

function displayCount(): void {

    if (items == 0) {
        let amount = JSON.parse(sessionStorage.getItem("itemAmount") || '0');
        items = amount;
    }
    let display: any = document.querySelector("#amount");
    display.innerHTML = items;
}

displayCount();

