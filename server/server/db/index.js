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

projectdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM superadmin`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

projectdb.one = (table, username) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE username = ?`, [username], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

projectdb.update_token = (table, id, token) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET token = ? WHERE UserID = ?;`, [token, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = projectdb;