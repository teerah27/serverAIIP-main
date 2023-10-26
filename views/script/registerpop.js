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

function showSuccessPopup() {
  const successPopup = document.getElementById('success-popup');
  successPopup.style.display = 'block';

  setTimeout(function() {
    successPopup.style.display = 'none';
  }, 3000);
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('success') && urlParams.get('success') === 'true') {
  showSuccessPopup();
} else if (urlParams.has('error') && urlParams.get('error') === 'email-in-use') {
  showErrorPopup();
} else if (urlParams.has('error') && urlParams.get('error') === 'password-mismatch') {
  showPasswordErrorPopup();
}