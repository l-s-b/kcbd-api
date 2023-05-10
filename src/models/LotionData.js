const { DataTypes } = require('sequelize');

module.exports = LotionData = (sequelize) => {
    sequelize.define(
        'LotionData',
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
            concentration: {
                type: DataTypes.ENUM("45", "90"),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
