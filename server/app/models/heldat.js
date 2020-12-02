module.exports = (sequelize, Sequelize) => {
    const heldat = sequelize.define("heldat", {
        address: {
            type: Sequelize.STRING
        },
        eventID: {
            type: Sequelize.INTEGER
        }
    });

    return heldat;
};