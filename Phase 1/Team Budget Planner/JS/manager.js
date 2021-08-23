var programsArr = new Array();

function storeData() {

    if (programsArr.length == 0) {

        let programs = JSON.parse(sessionStorage.getItem("programsDetail") || "[]");
        // to make sure the data is still update, not become [] again
        programsArr = programs;
    }

    let clientName = document.querySelector("#client").value;
    let projectName = document.querySelector("#project").value;
    let budgetAmount = document.querySelector("#budget").value;

    let programsObj = {
        client: clientName,
        project: projectName,
        budget: budgetAmount,
    };

    let form = document.querySelector("#new_form");

    programsArr.push(programsObj);

    sessionStorage.setItem("programsDetail", JSON.stringify(programsArr));

    // clean the form once the submit the data 
    form.reset();
}







