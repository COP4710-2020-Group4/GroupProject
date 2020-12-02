module.exports = (sequelize, Sequelize) => {
  const administers = sequelize.define("administers", {
    userID: {
      type: Sequelize.INTEGER
    },
    eventID: {
      type: Sequelize.INTEGER
    },
    isAdmin: {
      type: Sequelize.INTEGER
    }
  });

  return administers;
};