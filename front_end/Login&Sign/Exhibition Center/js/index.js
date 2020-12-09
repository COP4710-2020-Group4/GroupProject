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
let eventList = new Vue({
    el: "#eventList",
    data: {
        events:[
            {
                id:0,
                title:"Event #1",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg"
            },
            {
                id:1,
                title:"Event #2",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg"
            },
            {
                id:2,
                title:"Event #3",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg"
            },
            {
                id:3,
                title:"Event #4",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg"
            },
            {
                id:4,
                title:"Event #5",
                description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
                url:"",
                img_src: "http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg"
            },
        ]
    }
});