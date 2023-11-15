document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const content = document.getElementById("content");
    const iframe = document.getElementById("dashboard-iframe");

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

    setIframeSize(iframe.style.height = "743px");

    function setIframeSize() {
        if (sidenav.classList.contains("expanded")) {
            iframe.style.width = "100%";
            iframe.style.marginLeft = "0.8%"
        } else {
            iframe.style.width = "106%";
            iframe.style.marginLeft = "0%"
            iframe.style.animation = "0.8s";
        }
    }
    
    let sidenavLinks = document.querySelectorAll('.sidenav a');

    sidenavLinks.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});