"use strict";
generatePersonalRezepte();
async function generatePersonalRezepte() {
    let response = await fetch(`https://sarenkahasanewapp.herokuapp.com/rezepte?author=${localStorage.getItem("email")}`);
    let rezepte = await response.json();
    rezepte.forEach((rezept) => {
        let rezepteContainer = document.getElementById("alleRezepte");
        let rezeptContainer = document.createElement("div");
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
        let button = rezepteContainer.getElementsByClassName("delete")[0];
        button.addEventListener("click", async () => {
            await fetch(`https://sarenkahasanewapp.herokuapp.com/rezept/delete?id=${rezept._id}`);
            window.location.reload();
        });
    });
}
//# sourceMappingURL=meineRezepte.js.map