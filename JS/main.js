var TimeReport = {
    // A basic CRUD operation required data.
    timereports: [
        { id: 1, project: 'project1', activity: 'activity1', from: '1', to: '2', billable: 'true', note: '1' },
        { id: 2, project: 'project2', activity: 'activity2', from: '4', to: '8', billable: 'true', note: '2' },
        { id: 3, project: 'project3', activity: 'activity3', from: '5', to: '6', billable: 'false', note: '3' },
    ],
    form: null,
    idCounter: 4, // IdCounter initial value is length of timeReports +1 
    currentRow: null, 

    fillTable: function () {

        var table = document.getElementsByTagName("table")[0];
        // delete all rows from second to before last
        while (table.rows.length > 2) {
            table.deleteRow(1);
        }
        // add rows using json data
        // use let instead of var, to create new copy of i variable for each loop step
        for (let i = 0; i < TimeReport.timereports.length; i++) {
            // create a new row
            tr = table.insertRow(table.rows.length - 1);           

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = TimeReport.timereports[i]["project"];

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = TimeReport.timereports[i]["activity"];

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = TimeReport.timereports[i]["from"];

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = TimeReport.timereports[i]["to"];

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = TimeReport.timereports[i]["note"];


            var tabCell = tr.insertCell(-1);
            // create the button Redigera
            var button = document.createElement('button');
            button.innerHTML = "Redigera";
            button.addEventListener('click', function () {
                TimeReport.currentRow = i;
                var f = TimeReport.form.elements;
                var row = TimeReport.timereports[i];
                f.project.value = row.project;
                f.activity.value = row.activity;
                f.from.value = row.from;
                f.to.value = row.to;
                f.billable.checked = row.billable;
                f.note.value = row.note;
            });
            tabCell.appendChild(button);

            // create the button Radera
            var button = document.createElement('button');
            button.innerHTML = "Radera";
            button.addEventListener('click', function (ev) {
                if (window.confirm("Vill du Radera den här råd?")) {
                    TimeReport.timereports.splice(i, 1);
                    TimeReport.fillTable();
                }
            })
            tabCell.appendChild(button);
        } // for each row in timereports
    },
    init: function () {
        // create the button Spara
        TimeReport.form = document.forms[0];
        var submit_btn = TimeReport.form.elements[TimeReport.form.elements.length - 1];
        submit_btn.addEventListener('click', function (ev) {
            var f = TimeReport.form.elements;
            if (f.project.value === "") {
                alert("Vanligen välj ett Projekt");
            }
            else if (f.activity.value === "") {
                alert("Vanligen välj ett Activitet");
            }
            else if (f.from.value === "") {
                alert("Vanligen välj Tiden från");
            }
            else if (f.to.value === "") {
                alert("Vanligen välj Tiden till");
            }
            else {
                var row = {
                    id: TimeReport.idCounter,
                    project: f.project.value,
                    activity: f.activity.value,
                    from: f.from.value,
                    to: f.to.value,
                    billable: f.billable.checked,
                    note: f.note.value
                };
                TimeReport.idCounter += 1;

                // are we adding or editing?
                if (TimeReport.currentRow == null) {
                    TimeReport.timereports.push(row);
                }
                else {
                    TimeReport.timereports.splice(TimeReport.currentRow, 1, row);
                    TimeReport.currentRow = null;
                }

                TimeReport.fillTable();
                TimeReport.form.reset();
            }
            ev.preventDefault();
        });
        TimeReport.fillTable();
    }

}

TimeReport.init();
