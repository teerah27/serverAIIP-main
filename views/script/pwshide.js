function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("password-toggle");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class="fa fa-eye"></i>';
    }
}
