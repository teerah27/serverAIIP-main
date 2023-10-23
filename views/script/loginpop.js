// Function to show the not-registered popup
function showNotRegPopup() {
    const notRegPopup = document.getElementById('not-reg-popup');
    notRegPopup.style.display = 'block';

    // Set a timer to hide the pop-up after 5 seconds (5000 milliseconds)
    setTimeout(function () {
        notRegPopup.style.display = 'none';
    }, 5000);
}

// Function to show the failed login popup
function showFailPopup() {
    const failPopup = document.getElementById('fail-popup');
    failPopup.style.display = 'block';

    // Set a timer to hide the pop-up after 5 seconds (5000 milliseconds)
    setTimeout(function () {
        failPopup.style.display = 'none';
    }, 5000);
}

// Get URL parameters and display popups if needed
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('notreg') && urlParams.get('notreg') === 'true') {
    showNotRegPopup();
}

if (urlParams.has('fail') && urlParams.get('fail') === 'true') {
    showFailPopup();
}
