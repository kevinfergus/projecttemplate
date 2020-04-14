const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/templatedb', {
	logging: false
});

module.exports = db;
