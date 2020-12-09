const event_title = document.getElementById("event-title");
const event_url = document.getElementById("event-url");
const event_description = document.getElementById("event-description");
const start_date = document.getElementById("start_date");
const end_date = document.getElementById("end_date");
const address_name = document.getElementById("address-name");
const input_city = document.getElementById("inputCity");
const input_state = document.getElementById("inputState");
const input_zip = document.getElementById("inputZip");
const form = document.getElementById("event-form");

const url = "http://localhost:8080";


function createEvent(event){
    event.preventDefault();

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token:window.localStorage.getItem("token"),
            name: event_title.value,
            description: event_description.value,
            start_date:start_date.value,
            end_date:end_date.value,
            address: address_name.value.concat(", ", input_city.value, ", ", input_state.value, ", ", input_zip.value),
            url:event_url.value
        })};
        console.log(options);
        fetch(`${url}/api/createevent`, options)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.status === "success") {
                window.location.href = "./index.html";
                return true;
            } else if (res.status === "wrong date") {
                console.log("error", res.status);
                alert("Event Date in conflict with events between " + res.occupied_start + " and " + res.occupied_end);
                return false;
            }
        })
        .catch((err) => {
            console.log("error occurred", err);
            alert("Error occurred.");
            return false;
        });
}

form.addEventListener("submit", createEvent);


