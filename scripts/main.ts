isLoggedIn();
document.getElementById("logout").addEventListener("click", () => {
    logout();
});

async function isLoggedIn(): Promise<void> {
    let data: Credentials = {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password")
    };
    let credentials: string = JSON.stringify(data);
    let response: Response = await fetch("https://sarenkahasanewapp.herokuapp.com/login", {
        method: "POST",
        body: credentials // body data type must match "Content-Type" header
    });
    let responseJson: any = await response.json();
    console.log(responseJson.loggedIn);

    if (!responseJson.loggedIn) {
        alert("Your credentails dont match.");
        window.location.pathname = "sites/login.html";
    }
}

function logout(): void {
    localStorage.clear();
    window.location.pathname = "sites/login.html";
}

function bundleRezept(): Rezept {
    let titelInput: HTMLInputElement = <HTMLInputElement>document.getElementById("titel");
    let bildUrlInput: HTMLInputElement = <HTMLInputElement>document.getElementById("imageLink");

    let zutatenliste: Zutat[] = createZutat();
    let schrittliste: string[] = createSchritte();


    let rezept: Rezept = {
        titel: titelInput.value,
        imageUrl: bildUrlInput.value,
        zutatenliste: zutatenliste,
        schritte: schrittliste,
        author: localStorage.getItem("email")
    };
    return rezept;
}

function createZutat(): Zutat[] {
    let zutatenliste: Zutat[] = [];
    let zutatenlisteContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("zutatenliste");
    for (let i: number = 0; i < zutatenlisteContainer.children.length; i++) {
        let zutat: Zutat;
        let mengeInput: HTMLInputElement = <HTMLInputElement> zutatenlisteContainer.children[i].children[0];
        let zutatInput: HTMLInputElement = <HTMLInputElement> zutatenlisteContainer.children[i].children[1];
        if (!(mengeInput.value.length === 0 && zutatInput.value.length === 0)) {
            zutat = {
                menge: mengeInput.value,
                zutat: zutatInput.value
            };
            zutatenliste.push(zutat);
        }
    }
    return zutatenliste;
}

function createSchritte(): string[] {
    let schrittliste: string[] = [];
    let schrittlisteContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("listeSch");
    for (let i: number = 0; i < schrittlisteContainer.children.length; i++) {
        let schritt: string = "";
        let schrittInput: HTMLInputElement = <HTMLInputElement> schrittlisteContainer.getElementsByTagName("input")[i];
        if (!(schrittInput.value.length === 0)) {
            schritt = schrittInput.value;
            schrittliste.push(schritt);
        }
    }
    return schrittliste;
}

async function generateRezepte(url: string, onClick: Function): Promise<void> {
    let response: Response = await fetch(url);
    let rezepte: Rezept[] = await response.json();
    rezepte.forEach((rezept: Rezept, index: number) => {
        console.log(rezept);
        let rezepteContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("alleRezepte");
        let rezeptContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        rezeptContainer.className = "rezept";
        rezeptContainer.innerHTML = `<div>
                                        <img src="${rezept.imageUrl}" alt="Bild">
                                    </div>
                                    <div class="info">
                                        <h1>${rezept.titel}</h1>
                                        <p>von ${rezept.author}</p>
                                        <a href="rezept.html?id=${rezept._id}">Hier gelangst du zum Rezept</a>
                                        <button class="fav" data-liked="${rezept.likedBy.includes(localStorage.getItem("email"))}">${rezept.likedBy.includes(localStorage.getItem("email")) ? "-" : "+"}</button>
                                    </div>`;
        rezepteContainer.append(rezeptContainer);
        let button: HTMLButtonElement = <HTMLButtonElement>rezepteContainer.getElementsByClassName("fav")[index];
        button.addEventListener("click", async () => {
            onClick(rezept);
        });
    });
}