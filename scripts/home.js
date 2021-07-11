"use strict";
generateRezepte("https://sarenkahasanewapp.herokuapp.com/rezepte", async (rezept) => {
    let result;
    let clickedButton = event.target;
    if (clickedButton.dataset.liked === "true") {
        result = await fetch(`https://sarenkahasanewapp.herokuapp.com/rezepte/likedby/remove?user=${localStorage.getItem("email")}&id=${rezept._id}`);
        let resultJSON = await result.json();
        if (resultJSON.successful_updated === true) {
            clickedButton.dataset.liked = "false";
            clickedButton.innerText = "+";
        }
    }
    else {
        result = await fetch(`https://sarenkahasanewapp.herokuapp.com/rezepte/likedby/add?user=${localStorage.getItem("email")}&id=${rezept._id}`);
        let resultJSON = await result.json();
        if (resultJSON.successful_updated === true) {
            clickedButton.dataset.liked = "true";
            clickedButton.innerText = "-";
        }
    }
});
//# sourceMappingURL=home.js.map