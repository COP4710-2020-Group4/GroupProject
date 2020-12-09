Vue.component('event-card', {
    props: ['eventID', 'title', 'description', 'url',  'start-date', 'end-date'],
    template: '<div class="card col-lg-3 exhibition-col" style="width: 18px">\n' +
        '          <img src="http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg" class="card-img-top" alt="...">\n' +
        '          <div class="card-body">\n' +
        '            <h5 class="card-title">{{title}} </h5>\n' +
        '            <p class="card-text">{{description}}</p>\n' +
        '            <a onclick="this.rsvp()" class="btn btn-primary">Register</a>\n' +
        '          </div>\n' +
        '        </div>',
    methods: {
        rsvp() {
            console.log(this.eventID);
            rsvp(this.eventID)
        }
    }
});
Vue.component('event-list', {
   props:['active_events'],
   template: '<div class="row">\n' +
       '\t\t\t\t<event-card\n' +
       '\t\t\t\t\t\tv-for="item in active_events"\n' +
       '\t\t\t\t\t\tv-bind:key="item.eventID"\n' +
       '\t\t\t\t\t\tv-bind:title="item.event_Name"\n' +
       '\t\t\t\t\t\tv-bind:description="item.description"\n' +
       '\t\t\t\t\t\tv-bind:url="item.url"\n' +
       '\t\t\t\t\t\tv-bind:eventID="item.eventID"/>\n' +
       '\t\t\t</div>'
});
let eventGroups = new Vue({
    el: "#eventGroups",
    data: {
        events:[],
        active_events:[],
        created_events:[],
        registered_events:[]
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
                                    this.registered_events = res.attending;
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
    let created = document.getElementById("created_events");
    let active = document.getElementById("active_events");
    let registered = document.getElementById("registered_events");

    console.log(active);

    created.className = 'current_events';
    active.className = 'events';
    registered.className = 'events';
}

function showActive() {
    let created = document.getElementById("created_events");
    let active = document.getElementById("active_events");
    let registered = document.getElementById("registered_events");

    created.className = 'events';
    active.className = 'current_events';
    registered.className = 'events';
}

function showRegistered() {
    let created = document.getElementById("created_events");
    let active = document.getElementById("active_events");
    let registered = document.getElementById("registered_events");

    created.className = 'events';
    active.className = 'events';
    registered.className = 'current_events';
}

function rsvp(eventID) {
    console.log(eventID);
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
            } else if (res.status === "wrong token") {
                console.log("error", res.status);
            }

        })
        .catch((err) => {
            console.log("error occurred", err);
            alert("Error occurred.");
        });
}