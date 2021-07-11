"use strict";
let einloggenButton = document.getElementById("submit");
einloggenButton.addEventListener("click", () => {
    login();
    window.location.pathname = "GIS_21/sites/hauptseite.html";
});
function login() {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    saveCredentials(emailInput.value, passwordInput.value);
}
function saveCredentials(email, password) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
}
//# sourceMappingURL=login.js.map