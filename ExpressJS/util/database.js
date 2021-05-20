const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nirali15', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
