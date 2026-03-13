const baseURL = "https://itch.io/api/1/";
const apiKey = "auXF9kqhZuOqVNSOc3yGgi06sEubaTbevuKdj66e";

const titleElement = document.querySelector("h2");

async function getData() {
    try {
        const response = await fetch(`${baseURL}${apiKey}/my-games`);
        if (!response.ok) {
            throw new Error("Kunde inte hämta data: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        showGames(data);
    } catch (error) {
        showError(error);
    }
}

function showGames(games) {
    const gamesElement = document.getElementById("gamesElement");
    gamesElement.classList.add("column");

    games.forEach((game) => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("container");
        gameElement.classList.add("hover-container");

        gameElement.innerHTML = ``;

        gamesElement.appendChild(gameElement);
    });
}

function showError(error) {
    titleElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
}

getData();
