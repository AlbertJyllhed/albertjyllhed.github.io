const reposURL = "https://api.github.com/users/AlbertJyllhed/repos";
const portfolioElement = document.getElementById("portfolioElement");
const loaderElement = document.getElementById("loader");

async function getData() {
    try {
        const response = await fetch(reposURL);
        if (!response.ok) {
            throw new Error("Kunde inte hämta data: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        displayRepos(data);
    } catch (error) {
        showError(error);
    }
}

getData();

function displayRepos(repos) {
    portfolioElement.classList.add("column");
    loaderElement.style.display = "none";

    repos.forEach((repo) => {
        if (!repo.description) {
            return;
        }
        const repoElement = document.createElement("div");
        repoElement.classList.add("container");

        repoElement.innerHTML = `<h3>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </h3><p>${repo.description}</p>`;

        portfolioElement.appendChild(repoElement);
    });
}

function showError(error) {
    portfolioElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
}
