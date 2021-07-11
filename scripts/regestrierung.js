"use strict";
let regestrierButton = document.getElementById("regestrieren");
regestrierButton.addEventListener("click", () => {
    regestrieren();
});
async function regestrieren() {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let data = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    };
    let credentials = JSON.stringify(data);
    let response = await fetch("https://sarenkahasanewapp.herokuapp.com/regestrierung", {
        method: "POST",
        body: credentials // body data type must match "Content-Type" header
    });
    let responseJson = await response.json();
    console.log(responseJson.registered);
    if (responseJson.registered) {
        window.location.pathname = "sites/login.html";
    }
    else {
        alert("This email is already registered");
    }
}
//# sourceMappingURL=regestrierung.js.map