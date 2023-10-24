function showErrorPopup() {
    const popup = document.getElementById('error-popup');
    popup.style.display = 'block';

    setTimeout(function() {
      popup.style.display = 'none';
    }, 3000);

  function showPopup() {
    const overlay = document.getElementById('success-popup');
    overlay.style.display = 'block';

    setTimeout(function() {
    }, 5000);
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('success') && urlParams.get('success') === 'true') {
    showPopup();
  } else if (urlParams.has('error') && urlParams.get('error') === 'email-in-use') {
    showErrorPopup();
  }
}