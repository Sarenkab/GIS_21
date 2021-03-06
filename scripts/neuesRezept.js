"use strict";
let schrittCount = 4;
document.getElementById("weitereZutaten").addEventListener("click", () => {
    let zutatenlisteItem = document.createElement("div");
    zutatenlisteItem.className = "zutatenlisteItem";
    zutatenlisteItem.innerHTML = `<input type="text" name="menge" class="menge">
                                  <input type="text" name="zutat" class="zutat">`;
    let zutatenliste = document.getElementById("zutatenliste");
    zutatenliste.append(zutatenlisteItem);
});
document.getElementById("mehrSchritte").addEventListener("click", () => {
    let schrittlisteItem = document.createElement("div");
    schrittlisteItem.className = "schrittlisteItem";
    schrittlisteItem.innerHTML = `<label for="schritt">Schritt ${schrittCount}</span></label>
                                <input type="text" name="schritt" class="schritt">`;
    let schrittliste = document.getElementById("listeSch");
    schrittliste.append(schrittlisteItem);
    schrittCount += 1;
});
document.getElementById("submit").addEventListener("click", async () => {
    let rezept = bundleRezept();
    rezept.likedBy = [];
    let rezeptJSON = JSON.stringify(rezept);
    await fetch("https://sarenkahasanewapp.herokuapp.com/rezept/create", {
        method: "POST",
        body: rezeptJSON // body data type must match "Content-Type" header
    });
    window.location.pathname = "GIS_21/sites/meinerezepte.html";
});
//# sourceMappingURL=neuesRezept.js.map