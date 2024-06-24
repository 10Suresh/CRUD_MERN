const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");
const Category = require("./CategoryModel");
const Service = sequelize.define("Service", {
    Category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "id"
        }
    },
    Service_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ServiceType: {
        type: DataTypes.ENUM("Normal", "VIP"),
        defaultValue: "Normal",
        allowNull: false,
    },
    Price_Options: {
        type: DataTypes.ENUM("100", "200", "300", "400", "500"),
        defaultValue: "100",
        allowNull: false,
    },
},
    {
        tableName: "services"
    });

module.exports = Service;