const columns = document.querySelector(".columns");

async function getData() {
    try {
        const response = await fetch("../json/cv.json");
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
        jobElement.classList.add("container");

        jobElement.innerHTML = `<h3>${job.title}</h3>
        <h4>${job.timeline}</h4><p>${job.description}</p>`;

        jobsElement.appendChild(jobElement);
    });
}

function showEducation(education) {
    const schoolsElement = document.getElementById("educationElement");
    schoolsElement.classList.add("column");

    education.forEach((e) => {
        const schoolElement = document.createElement("div");
        schoolElement.classList.add("container");

        schoolElement.innerHTML = `<h3>${e.title}</h3>
        <h4>${e.timeline}</h4><p>${e.description}</p>`;

        schoolsElement.appendChild(schoolElement);
    });
}

function showError(error) {
    const courseListElement = document.querySelector(".columns");
    courseListElement.innerHTML = `<p class="error">Ett fel inträffade: ${error.message}</p>`;
}
