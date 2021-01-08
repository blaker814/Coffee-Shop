const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const addButton = document.querySelector("#createBeanVarBtn");
const eventHub = document.querySelector("body");

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("eventStateChanged"))
}

button.addEventListener("click", () => {
    showBeans();
});

const showBeans = () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            const HTMLString = beanVarieties.map(beanVar => displayAllBeanVarieties(beanVar)).join("");
            document.querySelector("#beanTown").innerHTML = `
                <h1>Bean Varieties</h1>
                ${HTMLString}
            `
        })
}

eventHub.addEventListener("click", event => {
    if (event.target.id == "createBeanVarBtn") {
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
            console.log("success");
        }
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("beanDeleteBtn--")) {
        deleteBean(clickEvent.target.id.split("--")[1]);
    }
})

eventHub.addEventListener("eventStateChanged", event => {
    showBeans();
})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const displayAllBeanVarieties = beanVar => {
    return `
        <h2>${beanVar.name}</h2>
        <p><strong>Region:</strong> ${beanVar.region}</p>
        <p><strong>Notes:</strong> ${beanVar.notes ? beanVar.notes : "None"}</p>
        <span>
            <button type="button" id="beanDeleteBtn--${beanVar.id}">Delete</button>
        </span>
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

const deleteBean = id => {
    return fetch(url + id, {
        method: "DELETE"
    })
        .then(dispatchStateChangeEvent);
}