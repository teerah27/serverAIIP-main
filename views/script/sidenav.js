document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const content = document.getElementById("content");
    const iframe = document.getElementById("dashboard-iframe");
    const table = document.getElementById("region");

    sidenav.addEventListener("mouseenter", function () {
        sidenav.classList.add("expanded");
        content.classList.add("expanded");
        setIframeSize();
        setTableSize();
    });

    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        content.classList.remove("expanded");
        setIframeSize();
        setTableSize();
    });

    setIframeSize(iframe.style.height = "780px");
    setTableSize(); // Call the function to set the table size initially

    function setIframeSize() {
        if (sidenav.classList.contains("expanded")) {
            iframe.style.width = "100%";
        } else {
            iframe.style.width = "100%";
        }
    }

    function setTableSize() {  
        if (sidenav.classList.contains("expanded")) {
            table.style.width = "45%"; 
        } else {
            table.style.width = "85%"; 
        }
    }
    
});
