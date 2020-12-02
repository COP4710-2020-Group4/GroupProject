module.exports = (sequelize, Sequelize) => {
    const superadmin = sequelize.define("superadmin", {
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        userID: {
            type: Sequelize.INTEGER
        }
    });

    return superadmin;
};