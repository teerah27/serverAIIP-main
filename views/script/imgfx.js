document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const table = document.getElementById("table-container3");
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
            table.style.marginLeft = "-4%";
        } else {
            table.style.marginLeft = originalMarginLeft;
        }
    }

    let sidenavLinks = document.querySelectorAll('.sidenav a');

    sidenavLinks.forEach(function (link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

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

    const deleteButtons = document.querySelectorAll(".delete-record");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
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
                    window.location.href = '/img_process/update';
                } else {
                    console.error("Error updating the database");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
});

function showImage(imagePath) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");

    modalImage.src = imagePath;

    modal.style.display = "block";
}
  
function closeModal() {
    var modal = document.getElementById("imageModal");

    modal.style.display = "none";
}
  
document.addEventListener("DOMContentLoaded", function() {
    var imageLinks = document.querySelectorAll(".image-link");
    imageLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
        event.preventDefault();
        var imagePath = link.getAttribute("href");
        showImage(imagePath);
        });
    });

    const processButton = document.querySelector(".css-img");

    processButton.addEventListener("click", (event) => {
        event.preventDefault();

        const processConfirmationPopup = document.getElementById('processConfirmation');
        processConfirmationPopup.style.display = 'block';

        const confirmProcessButton = document.getElementById('confirmProcess');
        const cancelProcessButton = document.getElementById('cancelProcess');

        confirmProcessButton.addEventListener('click', () => {
            processConfirmationPopup.style.display = 'none';
            initiateProcessing();
        });

        cancelProcessButton.addEventListener('click', () => {
            processConfirmationPopup.style.display = 'none';
        });
    });

    function initiateProcessing() {
        fetch('/img_process/get-user-email')
            .then(response => response.json())
            .then(data => {
                const sound = document.getElementById("sound");
                sound.play();
                const email = data.email;
                window.location.href = `http://47.250.10.195:8888?email=${email}`;
                updateDatabase(email);
            })
            .catch(error => {
                console.error("Error fetching user email:", error);
            });
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('process') && urlParams.get('process') === 'true') {
        showProcessPopup();
    }

    function updateDatabase(email) {
        fetch('/img_process/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/img_process/update';
                    showProcessPopup();
                } else {
                    console.error("Error updating the database");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function showProcessPopup() {
        const processPopup = document.getElementById('process-popup');
        processPopup.style.display = 'block';

        setTimeout(function () {
            processPopup.style.display = 'none';
        }, 3000);
    }
});

// window.location.href = `http://47.250.10.195:8888?email=${email}`;