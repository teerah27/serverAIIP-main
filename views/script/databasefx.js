document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const table = document.getElementById("region");
    let originalMarginLeft;

    sidenav.addEventListener("mouseenter", function () {
        originalMarginLeft = getComputedStyle(table).marginLeft;
        sidenav.classList.add("expanded");
        setTableSize("expanded");
    });

    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        setTableSize("collapsed");
    });

    function setTableSize(state) {
        if (state === "expanded") {
            table.style.marginLeft = "17%"; 
        } else {
            table.style.marginLeft = originalMarginLeft; 
        }
    }

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
});
