const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.define('author', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: function() {
			return getRandomImage();
		}
	}
});
