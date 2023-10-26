document.addEventListener('DOMContentLoaded', function () {
    // Get the logout button and confirmation popup elements
    var logoutButton = document.querySelector('a[href="/login/logout"]');
    var logoutConfirmation = document.getElementById('logoutConfirmation');
    var confirmLogoutButton = document.getElementById('confirmLogout');
    var cancelLogoutButton = document.getElementById('cancelLogout');

    // Add a click event listener to the logout button
    logoutButton.addEventListener('click', function (event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Show the confirmation popup
        logoutConfirmation.style.display = 'block';
    });

    // Add a click event listener to the "Yes" button in the confirmation popup
    confirmLogoutButton.addEventListener('click', function () {
        // Redirect to the logout URL (or perform your logout action here)
        window.location.href = "/login/logout";
    });

    // Add a click event listener to the "No" button in the confirmation popup
    cancelLogoutButton.addEventListener('click', function () {
        // Hide the confirmation popup
        logoutConfirmation.style.display = 'none';
    });
});
