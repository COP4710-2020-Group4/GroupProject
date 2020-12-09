const express = require('express');
const db = require('../db');
const bcrypt = require('../handlers/hash_handler');
const token_handler = require('../handlers/token_handler');
const router = express.Router();

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
    let db_user = await db.one(table_name, "token", req.body.token);
    if (db_user == undefined) {
        table_name = 'users';
        db_user = await db.one(table_name, "token", req.body.token);
        if (db_user == undefined || token_handler.token_valid(req.body.token)) {
            res.json({ status: `wrong token` });
            return
        }
    }
    // check for location event
    let loc = await db.get_event(req.body.address);
    if (loc != undefined) {
        // check valid time
        let s = req.body.start_date
        let e = req.body.end_date
        for (let i = 0; i < loc.length; i++) {
            start = s.substr(0, 4) + s.substr(5, 2) + s.substr(8, 2);
            end = e.substr(0, 4) + e.substr(5, 2) + e.substr(8, 2);
            db_start = loc[i].start_date.substr(0, 4) + loc[i].start_date.substr(5, 2) + loc[i].start_date.substr(8, 2);
            db_end = loc[i].end_date.substr(0, 4) + loc[i].end_date.substr(5, 2) + loc[i].end_date.substr(8, 2);

            if ((start <= db_start && end >= db_start) || (end >= db_end && start <= db_end) || (start > db_start && end < db_end) || (start < db_start && end > db_end)) {
                // console.log(start, end, db_start, db_end)
                res.json({
                    status: `wrong date`,
                    occupied_start: loc[i].start_date,
                    occupied_end: loc[i].end_date
                });
                return
            }
        }
    }

    // create id
    let id = Math.floor(Math.random() * 99999) + 10000;

    // create payloads
    let event = {
        "eventID": id,
        "name": req.body.name,
        "category": req.body.category,
        "start_date": req.body.start_date,
        "end_date": req.body.end_date,
        "description": req.body.description,
        "address": req.body.address,
        "userID": db_user.userID,
        "url": req.body.url
    }


    //update db
    let isCreated = db.create_event(event);

    // upgrade user to admin
    let isAdmin = db.update_to_admin(event.userID);
    // respond
    res.json({ status: 'success' });


});

router.get('/getuser', async (req, res) => {
    try {
        // check for valid token
        table_name = 'superadmin';
        let db_user = await db.one(table_name, "token", req.body.token);
        if (db_user == undefined) {
            table_name = 'users';
            db_user = await db.one(table_name, "token", req.body.token);
            if (db_user == undefined || token_handler.token_valid(req.body.token)) {

                res.json({ status: `wrong token` });
                return
            }
        }

        // set payload and return res
        let payload = {
            "status": "success",
            "first_name": db_user.first_name,
            "last_name": db_user.last_name
        }
        res.json(payload);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/events', async (req, res) => {
    try {
        let allEvents = await db.allEvents();
        res.json(allEvents);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/myevents', async (req, res) => {
    try {
        // check for valid token
        table_name = 'superadmin';
        let db_user = await db.one(table_name, "token", req.body.token);
        if (db_user == undefined) {
            table_name = 'users';
            db_user = await db.one(table_name, "token", req.body.token);
            if (db_user == undefined) {
                res.json({ status: `wrong token` });
                return
            }
        }

        let myEvents = await db.event_Admin(req.body.token);
        res.json(myEvents)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/attend', async (req, res) => {
    try {
        // check for valid token
        table_name = 'superadmin';
        let db_user = await db.one(table_name, "token", req.body.token);
        if (db_user == undefined) {
            table_name = 'users';
            db_user = await db.one(table_name, "token", req.body.token);
            if (db_user == undefined) {
                res.json({ status: `wrong token` });
                return
            }
        }

        let attending = await db.user_attend(req.body.token);
        res.json(attending);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/authlevel', async (req, rest) => {
    // check for valid token
    table_name = 'superadmin';
    let db_user = await db.one(table_name, "token", req.body.token);
    if (db_user == undefined) {
        table_name = 'users';
        db_user = await db.one(table_name, "token", req.body.token);
        if (db_user == undefined) {
            res.json({ status: `wrong token` });
            return
        }
    }
    let sup = await db.check_superAdmin(req.body.token);
    if (sup == undefined) {
        let adm = await db.check_Admin(req.body.token);
        if (adm != undefined) {
            res.json(adm);
        }
    }
    else {
        res.json(sup);
        try {

            let sup = await db.check_superAdmin(req.body.token);
            if (sup == undefined) {
                let adm = await db.check_Admin(req.body.token);
                if (adm == undefined) {
                    res.json({ status: "user" });
                }
                else {
                    res.json({ status: "admin" });
                }
            }
            else {
                res.json({ status: "superadmin" });
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
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