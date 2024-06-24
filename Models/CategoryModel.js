const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");
const Category = sequelize.define("Category", {
    Category_Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;