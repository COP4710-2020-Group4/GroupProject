module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        last_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.BIGINT
        },
        UserID: {
            type: Sequelize.STRING
        },
        userToken: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        }
    });

    return users;
};