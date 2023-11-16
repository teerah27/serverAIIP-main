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

    sidenavLinks.forEach(function(link) {
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
  
  document.addEventListener("DOMContentLoaded", function() {
    var imageLinks = document.querySelectorAll(".image-link");
    imageLinks.forEach(function(link) {
      link.addEventListener("click", function(event) {
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

    // Handle SOV buttons
    sovButtons.forEach(function (sovButton) {
        var index = sovButton.getAttribute('id').split('_')[1];
        var iconContainer = document.getElementById('sovIconContainer_' + index);

        if (sovButton && iconContainer) {
            var sovCompetitorValue = parseFloat(sovButton.getAttribute('data-competitor'));

            if (sovCompetitorValue >= 50) {
                sovButton.style.backgroundColor = 'red';
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-triangle';
                icon.style.color = 'yellow';
                iconContainer.appendChild(icon);
            }
        }
    });

    complianceButtons.forEach(function (complianceButton) {
        var index = complianceButton.getAttribute('id').split('_')[1];
        var iconContainer = document.getElementById('complianceIconContainer_' + index);
    
        if (complianceButton && iconContainer) {
            var complianceMaggi = data[index].annotated_json["Compliance Maggi"];
            var complianceNestle = data[index].annotated_json["Compliance Nestle"];
    
            if (complianceMaggi === 'Non-Compliance' || complianceNestle === 'Non-Compliance') {
                complianceButton.style.backgroundColor = 'red';
                var icon = document.createElement('i');
                icon.className = 'fa fa-exclamation-triangle';
                icon.style.color = 'yellow';
                iconContainer.appendChild(icon);
            }
        }
    });
});