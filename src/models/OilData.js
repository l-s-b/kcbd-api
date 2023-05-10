const { DataTypes } = require('sequelize');

module.exports = OilData = (sequelize) => {
    sequelize.define(
        'OilData',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            productId: {
                type: DataTypes.INTEGER,
                unique: true
            },
            flavor: {
                type: DataTypes.ENUM,
                values: ["Frutilla", "Menta", "Uva", "Carne (para mascotas)"],
                allowNull: false
            },
            concentration: {
                type: DataTypes.ENUM("45", "90"),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
