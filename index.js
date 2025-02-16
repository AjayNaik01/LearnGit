const textbox = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

let eventsArray = JSON.parse(localStorage.getItem("eventsArray")) || [];

function loadEvents() {
    taskList.innerHTML = "";
    eventsArray.forEach(event => {
        addEventToDOM(event);
    });
}

function addEventToDOM(event) {
    const contentDiv = document.createElement("div");
    const contentP = document.createElement("p");
    const contentButton = document.createElement("button");

    contentDiv.classList.add("content");
    contentP.innerText = event.eventName;

    contentButton.classList.add("remove");
    contentButton.innerText = "Remove";

    if (event.status === "done") {
        contentP.classList.add("done");
        contentButton.classList.add("done");
    }

    contentButton.addEventListener("click", () => {
        eventsArray = eventsArray.filter(e => e.id !== event.id);
        localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
        contentDiv.remove();
    });

    contentDiv.addEventListener("click", () => {
        event.status = event.status === "done" ? "" : "done";
        localStorage.setItem("eventsArray", JSON.stringify(eventsArray));

        contentP.classList.toggle("done");
        contentButton.classList.toggle("done");
    });

    contentDiv.appendChild(contentP);
    contentDiv.appendChild(contentButton);
    taskList.appendChild(contentDiv);
}
//---------------------------------------------------
addButton.addEventListener("click", () => {
    if (textbox.value.trim() === "")
        return;

    let event = {
        id: new Date().toISOString(),
        eventName: textbox.value,
        status: ""
    };

    eventsArray.push(event);
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
    addEventToDOM(event);

    textbox.value = "";
});

loadEvents();