// A basic CRUD operation required data.
timereports = [
    { id: 1, project: 'project1', activity: 'activitet1', from: '', to: '', billable: '', note: '' },
    { id: 2, project: 'project2', activity: 'activitet2', from: '', to: '', billable: '', note: '' },
    { id: 3, project: 'project3', activity: 'activitet3', from: '', to: '', billable: '', note: '' },
];

function crudTidRapport() {

    var table = document.getElementsByTagName("table")[0];
    // delete all rows from second to before last
    while (table.rows.length > 2) {
        table.deleteRow(1);
    }
    // add rows using json data
    for (var i = 0; i < timereports.length; i++) {

        tr = table.insertRow(table.rows.length - 1);           // create a new row

        for (var j in timereports[i]) {
            if (j == "id") {
                continue;
            }
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = timereports[i][j];
        }

        var tabCell = tr.insertCell(-1);
        // create the button Redigera
        var button = document.createElement('button');
        button.innerHTML = "Redigera";
        button.addEventListener ('click', function () {  
        })
        tabCell.appendChild(button);

        // create the button Radera
        var button = document.createElement('button');
        button.innerHTML = "Radera";
        button.addEventListener ('click', function () {
          if (window.confirm("Vill du Radera den här råd?")) {
            timereports.splice(i, 1);
            crudTidRapport();
          }  
        })
        tabCell.appendChild(button);

    }

};
crudTidRapport();
