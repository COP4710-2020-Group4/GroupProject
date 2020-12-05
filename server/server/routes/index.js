const express = require('express');
const db = require('../db');
const bcrypt = require('../handlers/hash_handler');
const token_handler = require('../handlers/token_handler');
const router = express.Router();

// router.get('/events', async (req, res, next) => {
//     try {
//         let results = await db.all();
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

router.post('/login', async (req, res) => {
    try {
        //check if superadmin
        let table_name = 'superadmin';
        let user_info_db = await db.one(table_name, "username", req.body.username);
        if (user_info_db == undefined) {
            table_name = 'users';
            user_info_db = await db.one(table_name, "username", req.body.username);
        }
        // retrieve user info
        let pass = req.body.password;
        if (user_info_db == undefined) {
            res.json({ status: "Wrong user or pass" })
            return
        }

        // validate password
        let isValid = bcrypt.compare_pass(pass, user_info_db.password);
        if (!isValid) {
            res.json({ status: "Wrong user or pass" })
            return
        }

        // create token and see if unique
        let token = await token_creation(table_name);
        let db_res = await db.update_token(table_name, user_info_db.userID, token);

        // set payload and return res
        let payload = {
            "status": "success",
            "token": token
        }
        res.json(payload);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/createuser', async (req, res) => {
    // check if user is not used already
    table_name = 'users';
    user_info_db = await db.one(table_name, 'username', req.body.username);
    if (user_info_db != undefined) {
        res.json({ status: `invalid username` })
        return
    }

    // create token and see if unique
    let token = await token_creation(table_name);

    // hash password
    let pass = bcrypt.hash_pass(req.body.password);

    // create user
    let user = {
        'username': req.body.username,
        'password': pass,
        'token': token,
        'isAdmin': 0,
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'phoneNumber': req.body.phoneNumber,
    }
    let created = await db.create_user(user);
    res.json({
        "status": "success",
        "token": token
    });

});

router.post('/createevent', async (req, res) => {
    // check for valid token
    table_name = 'superadmin';
    let db_token = await db.unique_token(table_name, req.body.token);
    if (db_token == undefined) {
        table_name = 'users';
        let db_token = await db.unique_token(table_name, req.body.token);
        if (db_token == undefined) {
            res.json({ status: `wrong token` });
            return
        }
    }

    // check for location event
    let loc = await db.get_event(req.body.address);
    if (loc != undefined) {
        // check valid time
        if (req.body.date == loc.date) {
            res.json({ status: `location taken at that date` });
            return
        }
    }

    // create id
    let id = Math.floor(Math.random() * 99999) + 10000;

    // create payloads
    let event = {
        "eventID": id,
        "name": req.body.event_name,
        "category": req.body.category,
        "date": req.body.date,
        "description": req.body.event_description
    }
    let heldat = {
        "eventID": id,
        "address": req.body.address
    }

    let location = {}
    if (loc == undefined) {
        
        location = {
            "name": req.body.location_name,
            "address": req.body.address,
            "capacity": req.body.capacity,
            "description": req.body.location_description,
            "size": req.body.size,
        }
    }
    console.log(heldat);

    //update db
    let isCreated = db.create_event(event, heldat, location);

    // respond
    res.json({ status: 'success' });


});



module.exports = router;


async function token_creation(table_name) {
    let token = ''
    while (true) {
        token = token_handler.create_token();
        let temp = await db.unique_token(table_name, token);
        if (temp == undefined) {
            break;
        }
    }
    return token;
}