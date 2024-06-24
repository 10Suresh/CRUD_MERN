const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");
const User = sequelize.define("User", {
    User_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: "users"
    });

module.exports = User;