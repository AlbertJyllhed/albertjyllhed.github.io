const columns = document.querySelector(".columns");

async function getData() {
    try {
        const response = await fetch("../cv.json");
        if (!response.ok) {
            throw new Error("Kunde inte hämta data: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        showJobs(data.jobs);
        showEducation(data.education);
    } catch (error) {
        showError(error);
    }
}

getData();

function showJobs(jobs) {
    const jobsElement = document.getElementById("jobsElement");
    jobsElement.classList.add("column");

    jobs.forEach((job) => {
        const jobElement = document.createElement("div");

        jobElement.innerHTML = `<div class="container"><h3>${job.title}</h3>
        <h3>${job.timeline}</h3><p>${job.description}</p></div>`;

        jobsElement.appendChild(jobElement);
    });
}

function showEducation(education) {
    const schoolsElement = document.getElementById("educationElement");
    schoolsElement.classList.add("column");

    education.forEach((e) => {
        const schoolElement = document.createElement("div");

        schoolElement.innerHTML = `<div class="container"><h3>${e.title}</h3>
        <h3>${e.timeline}</h3><p>${e.description}</p></div>`;

        schoolsElement.appendChild(schoolElement);
    });
}

function showError(error) {
    const courseListElement = document.querySelector(".columns");
    courseListElement.innerHTML = `<p class="error">Ett fel inträffade: ${error.message}</p>`;
}
