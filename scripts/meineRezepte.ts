generatePersonalRezepte();
async function generatePersonalRezepte(): Promise<void> {
    let response: Response = await fetch(`http://localhost:8100/rezepte?author=${localStorage.getItem("email")}`);
    let rezepte: Rezept[] = await response.json();
    rezepte.forEach((rezept: Rezept) => {
        let rezepteContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("alleRezepte");
        let rezeptContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        rezeptContainer.className = "rezept";
        rezeptContainer.innerHTML = `<div>
                                        <img src="${rezept.imageUrl}" alt="Bild">
                                    </div>
                                    <div class="info">
                                        <h1>${rezept.titel}</h1>
                                        <p>von ${rezept.author}</p>  
                                        <button class="delete">Löschen</button>
                                        <a href="/sites/editRezept.html?id=${rezept._id}"><button>Ergänzen</button></a>
                                    </div>`;
        rezepteContainer.append(rezeptContainer);
        let button: HTMLButtonElement = <HTMLButtonElement>rezepteContainer.getElementsByClassName("delete")[0];
        button.addEventListener("click", async () => {
            await fetch(`http://localhost:8100/rezept/delete?id=${rezept._id}`);
            window.location.reload();
        });
    });
}