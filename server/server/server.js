const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/routes", apiRouter);

// directs the client to the login signup page
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../front_end/Login&Sign', 'loginRegister.html'));
});

app.listen(process.env.PORT || '8080', () => {
    console.log(`Listening on ${process.env.PORT || '8080'}`);
});