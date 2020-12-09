Vue.component('event-card', {
    props: ['eventID', 'title', 'description', 'url',  'start_date', 'start_text', 'end_text', 'end_date', 'subscribed', 'func', 'registered'],
    template: '<div class="card col-lg-3 exhibition-col" style="width: 18px">\n' +
        '          <img src="http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg" class="card-img-top" alt="...">\n' +
        '          <div class="card-body">\n' +
        '            <h5 class="card-title">{{title}} </h5>\n' +
        '            <p class="card-text">Start Date: {{start_text}} </p>\n' +
        '            <p class="card-text">End Date: {{end_text}} </p>\n' +
        '            <p class="card-text">Description: <br/>{{description}}</p>\n' +
        '            <a :id="eventID" onclick="handleRegister(this.id)" class="btn btn-primary">{{subscribed}}</a>\n' +
        '          </div>\n' +
        '        </div>'

});
Vue.component('event-list', {
   props:['active_events', 'registered_events'],
   template: '<div class="row">\n' +
       '\t\t\t\t<event-card\n' +
       '\t\t\t\t\t\tv-for="item in active_events"\n' +
       '\t\t\t\t\t\tv-bind:key="item.eventID"\n' +
       '\t\t\t\t\t\tv-bind:title="item.event_Name"\n' +
       '\t\t\t\t\t\tv-bind:description="item.description"\n' +
       '\t\t\t\t\t\tv-bind:url="item.url"\n' +
       '\t\t\t\t\t\tv-bind:start_text="item.start_date.toString()"\n' +
       '\t\t\t\t\t\tv-bind:end_text="item.end_date.toString()"\n' +
       '\t\t\t\t\t\tv-bind:subscribed="registered_events.includes(item.eventID) ? \'Un-Register\' : \'Register\'"\n' +
       '\t\t\t\t\t\tv-bind:eventID="item.eventID"/>\n' +
       '\t\t\t</div>',
    methods: {
        handleRegister(eventID) {
            console.log(this.registered_events);
            console.log("AAAAAAAAAAAAAAAA");
            handleRegister(eventID, this.registered_events);
        },
        rsvp(eventID) {
            rsvp(eventID);
        },
        unsub(eventID) {
           unsub(eventID);
        }
    }
});
let eventGroups = new Vue({
    el: "#eventGroups",
    data: {
        events:[],
        active_events:[],
        created_events:[],
        registered_events:[],
        registered_eventID:[],
        selected:"active"
    },
    created: function () {
        let url = "http://localhost:8080";
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(`${url}/api/events`, options)
            .then((res) => res.json())
            .then((res) =>{
                let events = [];
                res.forEach((ev) => {
                   events.push({
                       address: ev.address,
                       category: ev.category,
                       description: ev.description,
                       end_date: ev.end_date,
                       eventID: ev.eventID,
                       event_Name: ev.event_Name,
                       start_date: ev.start_date,
                       url: ev.url,
                       userID: ev.userID
                   })
                });

                this.events = events;

                this.active_events = this.events.filter((ev)=> {
                    let curD = new Date();
                    let d = new Date(ev.start_date);
                    return curD <= d;
                });
                options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: window.localStorage.getItem("token")
                    })
                };
                console.log(options);
                fetch(`${url}/api/myevents`, options)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.status === "success") {
                            this.created_events = res.events;
                        } else if (res.status === "wrong token") {
                            console.log("error", res.status);
                        }
                        fetch(`${url}/api/attend`, options)
                            .then((res) => res.json())
                            .then((res) => {
                                if (res.status === "success") {
                                    this.registered_events = [...new Set(res.attending)];
                                    this.registered_events.forEach((ev)=>{
                                       this.registered_eventID.push(ev.eventID);
                                    });
                                    console.log(this.registered_events);
                                } else if (res.status === "wrong token") {
                                    console.log("error", res.status);
                                }

                            })
                            .catch((err) => {
                                console.log("error occurred", err);
                                alert("Error occurred.");
                                this.events = [];
                            });
                    })
                    .catch((err) => {
                        console.log("error occurred", err);
                        alert("Error occurred.");
                        this.events = [];
                    });
            })
            .catch((err) => {
                console.log("error occurred", err);
                alert("Error occurred.");
                this.events = [];
            });
    }
});

function updateDates(event) {
    event.preventDefault();

    let start = document.getElementById("start_date");
    let end = document.getElementById("end_date");
    if (start.value === "" || end.value === "")
        return false;
    let start_date = new Date(start.value);
    let end_date = new Date(end.value);

    eventGroups.active_events = eventGroups.events.filter((ev) => {
        let sD = new Date(ev.start_date);
        let eD = new Date(ev.end_date);
        return sD >= start_date && eD <= end_date;
    });
    return false;
}

document.getElementById("date_selection").addEventListener("submit", updateDates);

function showCreated() {
    eventGroups.selected = "created";
    document.getElementById("active").style.textDecoration= 'none';
    document.getElementById("created").style.textDecoration= 'underline';
    document.getElementById("registered").style.textDecoration= 'none';
}

function showActive() {
    eventGroups.selected = "active";
    document.getElementById("active").style.textDecoration= 'underline';
    document.getElementById("created").style.textDecoration= 'none';
    document.getElementById("registered").style.textDecoration= 'none';
}

function showRegistered() {
    eventGroups.selected = "registered";
    document.getElementById("active").style.textDecoration= 'none';
    document.getElementById("created").style.textDecoration= 'none';
    document.getElementById("registered").style.textDecoration= 'underline';
}
function handleRegister (eventID) {
    console.log(eventGroups.registered_eventID);
    console.log(eventGroups.registered_eventID.includes(Number(eventID)));
    if (!eventGroups.registered_eventID.includes(Number(eventID))) {
        rsvp(eventID);
    }
    else {
        console.log("Already Registered")
        unsub(eventID);
    }
}


function rsvp(eventID) {
    console.log(eventID);
    let newEvent = eventGroups.events.filter((ev)=>{
        return ev.eventID.toString() === eventID;
    });
    if (eventGroups.registered_events.includes(newEvent))
        return;
    let url = "http://localhost:8080";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
            eventID: eventID
        })
    };
    fetch(`${url}/api/rsvp`, options)
        .then((res) => res.json())
        .then((res) => {
            if (res.status === "success") {
                console.log(res.going);
                console.log(eventGroups.events);
                console.log(eventID);

                console.log(newEvent);
                if (!eventGroups.registered_events.includes(newEvent)) {
                    Vue.set(eventGroups.registered_events, eventGroups.registered_events.length, newEvent);
                }
                window.location.reload();
            } else if (res.status === "wrong token") {
                console.log("error", res.status);
            }

        })
        .catch((err) => {
            console.log("error occurred", err);
            alert("Error occurred.");
        });
}
function unsub(eventID) {
    let url = "http://localhost:8080";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
            eventID: eventID
        })
    };
    fetch(`${url}/api/deleteattendant`, options)
        .then((res) => res.json())
        .then((res) => {
            if (res.status === "success") {
                //eventGroups.registered_eventID.remove(eventGroups.registered_eventID.indexOf(eventID));
                console.log("removed");
                window.location.reload();
            } else if (res.status === "wrong token") {
                console.log("error", res.status);
            }

        })
        .catch((err) => {
            console.log("error occurred", err);
            alert("Error occurred.");
        });
}