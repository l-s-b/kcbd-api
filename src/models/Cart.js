const { DataTypes } = require('sequelize');

module.exports = Cart = (sequelize) => {
    sequelize.define(
        'Cart',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            }
        },
    );
};
