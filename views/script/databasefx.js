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

function showJsonPopup(jsonContent) {
    var popup = document.getElementById('jsonPopup');
    var jsonContentElement = document.getElementById('jsonContent');

    const cleanedJsonData = jsonContent.replace(/[{}"]/g, '');
    const formattedJsonData = cleanedJsonData.replace(/,/g, '\n');

    jsonContentElement.textContent = formattedJsonData;
    document.getElementById("jsonPopup").style.display = "block";
}

function closeJsonPopup() {
    document.getElementById("jsonPopup").style.display = "none";
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
                icon.style.color = 'red';

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'This is a custom popup!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                iconContainer.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                iconContainer.addEventListener('mouseleave', function () {
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
                icon.style.color = 'red';

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'This is a custom popup!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                iconContainer.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                iconContainer.addEventListener('mouseleave', function () {
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
                icon.style.color = 'red';

                var popupElement = document.createElement('div');
                popupElement.className = 'custom-popup';
                popupElement.innerHTML = 'This is a custom popup!';
                popupElement.style.display = 'none'; 
                iconContainer.appendChild(popupElement);

                iconContainer.addEventListener('mouseenter', function () {
                    showStatus(popupElement);
                });

                iconContainer.addEventListener('mouseleave', function () {
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