module.exports = (sequelize, Sequelize) => {
    const location = sequelize.define("location", {
        address: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        name: {
            password: Sequelize.STRING
        },
        size: {
            password: Sequelize.INTEGER
        }
    });

    return location;
};