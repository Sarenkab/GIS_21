let einloggenButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("submit");

einloggenButton.addEventListener("click", () => {
    login();
    window.location.pathname = "GIS_21/sites/hauptseite.html";
});

function login(): void {
    let emailInput: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
    let passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
    saveCredentials(emailInput.value, passwordInput.value);
}

function saveCredentials(email: string, password: string): void {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
}