document.addEventListener('DOMContentLoaded', function () {
    const infoIcon = document.getElementById('info-icon');
    const passwordGuidelines = document.getElementById('password-guidelines');

    infoIcon.addEventListener('click', function () {
        if (passwordGuidelines.style.display === 'none' || passwordGuidelines.style.display === '') {
            passwordGuidelines.style.display = 'block';
        } else {
            passwordGuidelines.style.display = 'none';
        }
    });
});
