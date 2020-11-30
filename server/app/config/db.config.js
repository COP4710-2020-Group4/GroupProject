module.exports = {
    HOST: "localhost",
    USER: "root", // need to be changed
    PASSWORD: "123456", // need to be changed
    DB: "testdb", // need to be changed
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};