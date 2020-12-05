const mysql = require('mysql2');
const creds = require('./creds.json');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: creds.user,
    password: creds.pass,
    database: creds.db_name,
    host: creds.host,
    port: creds.port
})

let projectdb = {};

// projectdb.all = () => {
//     return new Promise((resolve, reject) => {
//         pool.query(`SELECT * FROM superadmin`, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         });
//     });
// };

projectdb.one = (table, param, variable) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${param} = ?`, [variable], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

projectdb.get_event = (variable) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * 
            FROM heldat H, event E
            WHERE E.eventID = H.eventID AND H.address = ?`, [variable], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

projectdb.unique_token = (table, token) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE token = ?;`, [token], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

projectdb.update_token = (table, id, token) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET token = ? WHERE userID = ?;`, [token, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

projectdb.create_user = (user) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO users 
                (username, password, token, isAdmin, first_name, last_name, email, phoneNumber) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [user.username, user.password, user.token, user.isAdmin, user.first_name, user.last_name, user.email, user.phoneNumber], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
};

projectdb.create_event = (e, h, l) => {
    return new Promise((resolve, reject) => {
        // event
        pool.query(`INSERT INTO event 
        (category, date, eventID, description) 
        VALUES (?, ?, ?, ?);`,
            [e.category, e.date, e.eventID, e.description], (err, results) => {
                if (err) {
                    return reject(err);
                }
                // return resolve(results[0]);
            });

        // location
        if (l != {}) {
            pool.query(`INSERT INTO location 
            (name, address, capacity, description, size) 
            VALUES (?, ?, ?, ?, ?);`,
                [l.name, l.address, l.capacity, l.description, l.size], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    // return resolve(results[0]);
                });
        }

        // heldat
        console.log(h);
        pool.query(`INSERT INTO heldat 
        (eventID, address) 
        VALUES (?, ?);`,
            [h.eventID, h.address], (err, results) => {
                if (err) {
                    return reject(err);
                }
                // return resolve(results[0]);
            });

        return resolve(true);
    });
};


module.exports = projectdb;