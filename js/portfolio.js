const reposURL = "https://api.github.com/users/AlbertJyllhed/repos";
const sectionElement = document.querySelector("section");

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
    sectionElement.innerHTML = "<h2>Portfolio</h2>";

    repos.forEach((repo) => {
        const repoElement = document.createElement("div");

        repoElement.innerHTML = `<h3>
        <a href="${repo.html_url}">${repo.name}</a></h3>
        <p>${repo.description}</p>`;

        sectionElement.appendChild(repoElement);
    });
}

function showError(error) {
    sectionElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
}
