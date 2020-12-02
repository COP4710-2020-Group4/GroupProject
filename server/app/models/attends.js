module.exports = (sequelize, Sequelize) => {
    const attends = sequelize.define("attends", {
        comment: {
            type: Sequelize.TEXT('tiny')
        },
        eventID: {
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER
        },
        UserID: {
            type: Sequelize.INTEGER
        }
    });

    return attends;
};