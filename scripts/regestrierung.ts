let regestrierButton = document.getElementById("regestrieren");
regestrierButton.addEventListener("click", () => {
  regestrieren();
});

async function regestrieren(): Promise<void> {
    let emailInput:HTMLInputElement = <HTMLInputElement>document.getElementById("email");
    let passwordInput:HTMLInputElement = <HTMLInputElement>document.getElementById("password");


    let data: Credentials = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };
    let credentials: string = JSON.stringify(data);
    let response: Response = await fetch("https://sarenkahasanewapp.herokuapp.com/regestrierung", {
        method: "POST",
        body: credentials // body data type must match "Content-Type" header
    });
    let responseJson = await response.json()
    console.log(responseJson.registered);
    if(responseJson.registered){
      
      window.location.pathname = "sites/login.html";
    } else {
      alert("This email is already registered");
    }
}