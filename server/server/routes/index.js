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
        let user_info_db = await db.one(table_name, req.body.username);
        if (user_info_db == undefined) {
            table_name = 'users';
            user_info_db = await db.one(table_name, req.body.username);
        }
        // retrieve user info
        let pass = req.body.password;
        if (user_info_db == undefined) {
            res.json({ status: "Wrong user or pass" })
        }

        // validate password
        let isValid = bcrypt.compare_pass(pass, user_info_db.password);
        if (!isValid) {
            res.json({ status: "Wrong user or pass" })
        }

        // create token and see if unique
        let token = ''
        while (true) {
            token = token_handler.create_token();
            let temp = await db.uniquetoken(table_name, token);
            if (temp == undefined) {
                break;
            }
        }
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
    user_info_db = await db.one(table_name, req.body.username);
    if (user_info_db != undefined) {
        res.json({ status: `invalid username` })
    }

    // create token and see if unique
    let token = ''
    while (true) {
        token = token_handler.create_token();
        let temp = await db.uniquetoken(table_name, token);
        if (temp == undefined) {
            break;
        }
    }

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
    console.log(created);
    res.json({
        "status": "success",
        "token": token
    });

});

module.exports = router;