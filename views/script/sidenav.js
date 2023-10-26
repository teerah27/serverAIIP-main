document.addEventListener("DOMContentLoaded", function () {
    const sidenav = document.getElementById("sidenav");
    const content = document.getElementById("content");
    const iframe = document.getElementById("dashboard-iframe");

    sidenav.addEventListener("mouseenter", function () {
        sidenav.classList.add("expanded");
        content.classList.add("expanded");
        setIframeSize(); // Set the iframe size when the sidenav is expanded
    });
    
    sidenav.addEventListener("mouseleave", function () {
        sidenav.classList.remove("expanded");
        content.classList.remove("expanded");
        setIframeSize(); // Set the iframe size when the sidenav is collapsed
    });
    
    
    // Set the initial iframe size
    setIframeSize(iframe.style.height = "780px");
    function setIframeSize() {

        if (sidenav.classList.contains("expanded")) {
            iframe.style.height = "780px";
            iframe.style.width = "100%";
        } else {
            iframe.style.height = "780px"; // Adjust the size as needed
            iframe.style.width =  "100%";
        }

        

}
}
)