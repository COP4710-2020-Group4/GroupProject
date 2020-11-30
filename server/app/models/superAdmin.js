module.exports = (sequelize, Sequelize) => {
    const SuperAdmin = sequelize.define("superAdmin", {
      username: {
        type: Sequelize.STRING
      },
      description: {
        password: Sequelize.STRING
      },
      token: {
        type: Sequelize.INTEGER
      }
    });
  
    return SuperAdmin;
  };