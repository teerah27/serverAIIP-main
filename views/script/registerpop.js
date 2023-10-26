function showErrorPopup() {
  const errorPopup = document.getElementById('error-popup');
  errorPopup.style.display = 'block';

  setTimeout(function() {
    errorPopup.style.display = 'none';
  }, 3000);
}

function showPasswordErrorPopup() {
  const passwordErrorPopup = document.getElementById('pswerror-popup');
  passwordErrorPopup.style.display = 'block';

  setTimeout(function() {
    passwordErrorPopup.style.display = 'none';
  }, 3000);
}

function showPasswordWeakErrorPopup() {
  const passwordWeakErrorPopup = document.getElementById('weakerror-popup');
  passwordWeakErrorPopup.style.display = 'block';

  setTimeout(function() {
    passwordWeakErrorPopup.style.display = 'none';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    setTimeout(function() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('success') && urlParams.get('success') === 'true') {
        showPopup();
      } else if (urlParams.has('error') && urlParams.get('error') === 'email-in-use') {
        showErrorPopup();
      } else if (urlParams.has('error') && urlParams.get('error') === 'password-mismatch') {
        showPasswordErrorPopup();
      } else if (urlParams.has('error') && urlParams.get('error') === 'weak-password') {
        showPasswordWeakErrorPopup();
      }
    }, 1000);
  });
});