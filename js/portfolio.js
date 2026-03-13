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

        showRepos(data);
    } catch (error) {
        showError(error);
    }
}

function showRepos(repos) {
    portfolioElement.classList.add("column");
    loaderElement.style.display = "none";

    repos.forEach((repo) => {
        if (!repo.description) {
            return;
        }
        const repoElement = document.createElement("div");
        repoElement.classList.add("container");
        repoElement.classList.add("hover-container");
        repoElement.addEventListener("click", () => {
            window.open(repo.html_url, "_blank").focus();
        });

        repoElement.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p>`;

        portfolioElement.appendChild(repoElement);
    });
}

function showError(error) {
    portfolioElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
}

getData();
