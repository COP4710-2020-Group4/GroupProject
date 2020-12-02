module.exports = (sequelize, Sequelize) => {
    const event = sequelize.define("event", {
        category: {
            type: Sequelize.TEXT('tiny')
        },
        date: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.TEXT('tiny')
        },
        eventID: {
            type: Sequelize.INTEGER
        }
    });

    return event;
};