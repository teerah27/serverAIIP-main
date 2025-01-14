document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const table = document.getElementById("table-container2");
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
            table.style.marginLeft = "5%";
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

    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach((row, index) => {
        const noColumn = row.querySelector('td:first-child');
        noColumn.textContent = index + 1;
    });
});

function filterData() {
    const staffFilter = document.getElementById("staffFilter").value.toLowerCase();
    const outletFilter = document.getElementById("outletFilter").value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const staffColumn = row.querySelector('td:nth-child(4)').textContent.toLowerCase(); // Adjust index based on your table structure
        const outletColumn = row.querySelector('td:nth-child(5)').textContent.toLowerCase(); // Adjust index based on your table structure

        const staffMatch = staffFilter === "all" || staffColumn.includes(staffFilter);
        const outletMatch = outletFilter === "all" || outletColumn.includes(outletFilter);

        if (staffMatch && outletMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}



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

document.addEventListener("DOMContentLoaded", function () {
    var imageLinks = document.querySelectorAll(".image-link");
    imageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            var imagePath = link.getAttribute("href");
            showImage(imagePath);
        });
    });
});

function showJsonPopup(title, jsonContent) {
    var modal = document.getElementById('jsonPopup');
    var jsonContentElement = document.getElementById('jsonContent');

    const cleanedJsonData = jsonContent.replace(/[{}"]/g, '');
    const keyValuePairs = cleanedJsonData.split(',');
    const tableRows = keyValuePairs.map(pair => {
        const [key, value] = pair.split(':');
        return `<tr><td>${key}</td><td>${value}</td></tr>`;
    }).join('');

    const tableHTML = `
        <div style="width: 100%; margin: 0 auto;">
            <h3 style="text-align: center;">${title}</h3>
            <table class="json-table" style="margin: 0 auto;">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;

    jsonContentElement.innerHTML = tableHTML;
    modal.style.display = "block";
}


function closeJsonPopup() {
    var modal = document.getElementById('jsonPopup');
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    var sovButtons = document.querySelectorAll('.sovButtonJSON');
    var complianceButtons = document.querySelectorAll('.complianceButtonJSON');
    var oosButtons = document.querySelectorAll('.oosButtonJSON');

    sovButtons.forEach(function (sovButton) {
        var index = sovButton.getAttribute('id').split('_')[1];
        var iconContainer = document.getElementById('sovIconContainer_' + index);

        if (sovButton && iconContainer) {
            var sovCompetitorValue = parseFloat(sovButton.getAttribute('data-competitor'));

            if (sovCompetitorValue >= 50) {
                sovButton.style.backgroundColor = 'red';
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-circle';
                iconContainer.appendChild(icon);

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'All products has lower SOV value than competitor!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                icon.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                icon.addEventListener('mouseleave', function () {
                    hideStatus(popupElement);
                });
            } else {
                sovButton.style.backgroundColor = 'green';
                var icon = document.createElement('i');
                iconContainer.appendChild(icon);
            }
        }
    });

    complianceButtons.forEach(function (complianceButton) {
        var index = complianceButton.getAttribute('id').split('_')[1];
        var iconContainer = document.getElementById('complianceIconContainer_' + index);

        if (complianceButton && iconContainer) {
            var maggiComplianceValue = complianceButton.getAttribute('data-maggi');
            var nestleComplianceValue = complianceButton.getAttribute('data-nestle');
            var maggiEyeValue = complianceButton.getAttribute('eye-maggi');
            var nestleEyeValue = complianceButton.getAttribute('eye-nestle');

            if ((maggiComplianceValue === 'Non-Compliance' && nestleComplianceValue === 'Non-Compliance') && (maggiEyeValue === 'No' && nestleEyeValue === 'No')) {
                complianceButton.style.backgroundColor = 'red';
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-circle';
                iconContainer.appendChild(icon);

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'All product are non-compliance and not on eye level!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                icon.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                icon.addEventListener('mouseleave', function () {
                    hideStatus(popupElement);
                });
            } else if ((maggiComplianceValue === 'Compliance' && nestleComplianceValue === 'Compliance') && (maggiEyeValue === 'Yes' && nestleEyeValue === 'Yes')) {
                complianceButton.style.backgroundColor = 'green';
            } else {
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-circle';
                iconContainer.appendChild(icon);
            }
        }
    });

    oosButtons.forEach(function (oosButton) {
        var index = oosButton.getAttribute('id').split('_')[1];
        var iconContainer = document.getElementById('oosIconContainer_' + index);

        if (oosButton && iconContainer) {
            var kariValue = oosButton.getAttribute('data-kari');
            var tomyamValue = oosButton.getAttribute('data-tomyam');
            var kokoValue = oosButton.getAttribute('data-koko');
            var miloValue = oosButton.getAttribute('data-milo');
            var starValue = oosButton.getAttribute('data-star');

            if (kariValue === 'Yes' && tomyamValue === 'Yes' && kokoValue === 'Yes' && miloValue === 'Yes' && starValue === 'Yes') {
                oosButton.style.backgroundColor = 'red';
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-circle';
                iconContainer.appendChild(icon);

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'All products are not in stock!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                icon.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                icon.addEventListener('mouseleave', function () {
                    hideStatus(popupElement);
                });
            } else if (kariValue === 'No' && tomyamValue === 'No' && kokoValue === 'No' && miloValue === 'No' && starValue === 'No') {
                oosButton.style.backgroundColor = 'green';
            } else {
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-circle';
                iconContainer.appendChild(icon);
            }
        }
    });

    function showStatus(popupElement) {
        popupElement.style.display = 'block';
    }

    function hideStatus(popupElement) {
        popupElement.style.display = 'none';
    }
});


