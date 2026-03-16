const baseURL = "https://proxy.corsfix.com/?https://itch.io/api/1/";
const apiKey = "2fncPVySJ7jw6E2TNrjNAF0MJFv0WkexhB138aWu";

const titleElement = document.querySelector("h2");
const loaderElement = document.getElementById("loader");

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

function showGames(data) {
    const gamesElement = document.getElementById("gamesElement");
    gamesElement.classList.add("column");
    loaderElement.style.display = "none";

    data.games.forEach((game) => {
        if (!game.published_at) {
            return;
        }
        const gameElement = document.createElement("div");
        gameElement.classList.add("container");
        gameElement.classList.add("hover-container");
        gameElement.addEventListener("click", () => {
            window.open(game.url, "_blank").focus();
        });

        gameElement.innerHTML = `<img src="${game.cover_url}" /><h3>${game.title}</h3>
        <h4>Released ${game.published_at}</h4><p>${game.short_text}</p>`;

        gamesElement.appendChild(gameElement);
    });
}

function showError(error) {
    titleElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
}

getData();
