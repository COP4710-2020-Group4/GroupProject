Vue.component('event-card', {
    props: ['title', 'description', 'url', 'img_src', 'start-date', 'end-date'],
    template: '<div class="card col-lg-3 exhibition-col" style="width: 18rem;">\n' +
        '          <img v-bind:src="img_src" class="card-img-top" alt="...">\n' +
        '          <div class="card-body">\n' +
        '            <h5 class="card-title">{{title}} </h5>\n' +
        '            <p class="card-text">{{description}}</p>\n' +
        '            <a href="#" class="btn btn-primary">Register</a>\n' +
        '          </div>\n' +
        '        </div>'
});
Vue.component('event-list', {
   props:['active_events'],
   template: '<div class="row">\n' +
       '\t\t\t\t<event-card\n' +
       '\t\t\t\t\t\tv-for="item in active_events"\n' +
       '\t\t\t\t\t\tv-bind:key="item.id"\n' +
       '\t\t\t\t\t\tv-bind:title="item.title"\n' +
       '\t\t\t\t\t\tv-bind:description="item.description"\n' +
       '\t\t\t\t\t\tv-bind:url="item.url"\n' +
       '\t\t\t\t\t\tv-bind:img_src="item.img_src"/>\n' +
       '\t\t\t</div>'
});
let eventGroups = new Vue({
    el: "#eventGroups",
    data: {
        events:[
            {
                id:0,
                title:"Event #1",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg",
                start_date: "2020-12-9",
                end_date: "2020-12-9"
            },
            {
                id:1,
                title:"Event #2",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg",
                start_date: "2020-12-10",
                end_date: "2020-12-10"
            },
            {
                id:2,
                title:"Event #3",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg",
                start_date: "2020-12-11",
                end_date: "2020-12-11"
            },
            {
                id:3,
                title:"Event #4",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg",
                start_date: "2020-12-12",
                end_date: "2020-12-12"
            },
            {
                id:4,
                title:"Event #5",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg",
                start_date: "2020-12-13",
                end_date: "2020-12-13"
            },
        ],
        active_events:[],
        created_events:[]
    },
    created: function () {
        this.active_events = this.events.filter((ev)=> {
            let curD = new Date();
            let d = new Date(ev.start_date);
            d.setHours(0,0,0,0);
            return curD <= d;
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