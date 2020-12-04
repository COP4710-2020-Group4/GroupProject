const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(process.env.PORT || '8080', () => {
    console.log(`Listening on ${process.env.PORT || '8080'}`);
});