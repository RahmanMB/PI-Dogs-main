const { DataTypes } = require("sequelize");
// We export a function that defines the model
// Then we inject the connection to sequelize.
module.exports = (sequelize) => {
	sequelize.define(
		"temperament",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
