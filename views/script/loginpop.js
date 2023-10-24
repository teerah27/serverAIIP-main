function showNotRegPopup() {
    const notRegPopup = document.getElementById('not-reg-popup');
    notRegPopup.style.display = 'block';

    setTimeout(function () {
        notRegPopup.style.display = 'none';
    }, 5000);
}
function showFailPopup() {
    const failPopup = document.getElementById('fail-popup');
    failPopup.style.display = 'block';

    setTimeout(function () {
        failPopup.style.display = 'none';
    }, 5000);
}
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('notreg') && urlParams.get('notreg') === 'true') {
    showNotRegPopup();
}

if (urlParams.has('fail') && urlParams.get('fail') === 'true') {
    showFailPopup();
}
