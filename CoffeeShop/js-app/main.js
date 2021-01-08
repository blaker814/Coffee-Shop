const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const addButton = document.querySelector("#createBeanVarBtn");

button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            const HTMLString = beanVarieties.map(beanVar => displayAllBeanVarieties(beanVar)).join("");
            document.querySelector("#beanTown").innerHTML = `
                <h1>Bean Varieties</h1>
                ${HTMLString}
            `
        })
});

addButton.addEventListener("click", () => {
    const nameField = document.querySelector(".beanName");
    const regionField = document.querySelector(".beanRegion");
    const notesField = document.querySelector(".beanNotes");
    if (nameField.value !== "" && regionField.value !== "") {
        const newVar = {
            "name": nameField.value,
            "region": regionField.value,
            "notes": notesField.value
        }
        addBean(newVar);
        nameField.value = "";
        regionField.value = "";
        notesField.value = "";
    }
})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const displayAllBeanVarieties = beanVar => {
    return `
        <h2>${beanVar.name}</h2>
        <p><strong>Region:</strong> ${beanVar.region}</p>
        <p><strong>Notes:</strong> ${beanVar.notes ? beanVar.notes : "None"}</p>
    `
}

const addBean = bean => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bean)
    })
}