document.addEventListener('DOMContentLoaded', function () {
    var logoutButton = document.querySelector('a[href="/login/logout"]');
    var logoutConfirmation = document.getElementById('logoutConfirmation');
    var confirmLogoutButton = document.getElementById('confirmLogout');
    var cancelLogoutButton = document.getElementById('cancelLogout');

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        logoutConfirmation.style.display = 'block';
    });

    confirmLogoutButton.addEventListener('click', function () {
        window.location.href = "/login/logout";
    });
  
    cancelLogoutButton.addEventListener('click', function () {
        logoutConfirmation.style.display = 'none';
    });
});
