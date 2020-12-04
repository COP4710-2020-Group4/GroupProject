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

        // create token
        let token = token_handler.create_token();
        let db_res = await db.update_token(table_name, user_info_db.UserID, token);

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

module.exports = router;