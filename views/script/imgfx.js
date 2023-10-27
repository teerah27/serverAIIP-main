function showRows(database) {
    var rows = document.querySelectorAll("#database tr");
    var count = 1; 

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        if (row.id === "header") {
            row.style.display = "table-row";
            continue; 
        }

        row.style.display = "none"; 

        if (row.getAttribute("database") === database || database === "All") {
            row.style.display = "table-row";

            if (row.getAttribute("database") === database) {
                row.cells[0].textContent = count;
                count++;
            } else if (database === "All") {
                row.cells[0].textContent = count;
                count++;
            }
        }
    }
}

const tableRows = document.querySelectorAll('tbody tr');

tableRows.forEach((row, index) => {
    const noColumn = row.querySelector('td:first-child');
    noColumn.textContent = index + 1;
});

document.addEventListener("DOMContentLoaded", function() {
    const deleteButtons = document.querySelectorAll(".delete-record");
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            updateDatabase();
        });
    });

    function updateDatabase() {
        fetch('/img_process/update', {
            method: "POST",
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'http://47.250.10.195:8888/';
            } else {
                console.error("Error updating the database");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});