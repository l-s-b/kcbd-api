const { DataTypes } = require('sequelize');

module.exports = MerchData = (sequelize) => {
    sequelize.define(
        'MerchData',
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
        },
        { timestamps: false }
    );
};
