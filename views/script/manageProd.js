document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const manageContainer = document.querySelector(".manage-container");
    let originalMarginLeft;

    sidenav.addEventListener("mouseenter", function () {
        originalMarginLeft = getComputedStyle(manageContainer).marginLeft; 
        sidenav.classList.add("expanded");
        setManageContainerSize("expanded");
    });

    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        setManageContainerSize("collapsed");
    });

    function setManageContainerSize(state) {
        if (state === "expanded") {
            manageContainer.style.marginLeft = "3%"; 
        } else {
            manageContainer.style.marginLeft = originalMarginLeft;
        }
    }
    const tableRows = document.querySelectorAll('tbody tr');

tableRows.forEach((row, index) => {
    const noColumn = row.querySelector('td:first-child');
    noColumn.textContent = index + 1;
});
let sidenavLinks = document.querySelectorAll('.sidenav a');

sidenavLinks.forEach(function(link) {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

});


