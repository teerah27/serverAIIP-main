document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const content = document.getElementById("content");
    const iframe = document.getElementById("dashboard-iframe");
    const manageContainer = document.querySelector(".manage-container");

    sidenav.addEventListener("mouseenter", function () {
        sidenav.classList.add("expanded");
        content.classList.add("expanded");
        setIframeSize();
        setManageContainerSize("expanded");
    });

    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        content.classList.remove("expanded");
        setIframeSize();
        setManageContainerSize("collapsed");
    });

    setIframeSize(iframe.style.height = "780px");

    function setIframeSize() {
        if (sidenav.classList.contains("expanded")) {
            iframe.style.width = "101%";
        } else {
            iframe.style.width = "101%";
        }
    }
    
    function setManageContainerSize(state) {
        if (state === "expanded") {
            manageContainer.style.marginLeft = "10%"; 
        } else {
            manageContainer.style.marginLeft = originalMarginLeft;
        }
    }
    let sidenavLinks = document.querySelectorAll('.sidenav a');

    sidenavLinks.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});