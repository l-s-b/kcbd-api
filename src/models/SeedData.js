const { DataTypes } = require('sequelize');

module.exports = SeedData = (sequelize) => {
    sequelize.define(
        'SeedData',
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
            seedType: {
                type: DataTypes.ENUM,
                values: ['Automática', 'Fotoperiódica', 'Regular'],
                allowNull: false,
            },
            thc: {
                type: DataTypes.ENUM,
                values: ["Alto", "Medio", "Bajo"],
                allowNull: true
            },
            cbd: {
                type: DataTypes.ENUM,
                values: ["Alto", "Medio", "Bajo"],
                allowNull: true
            },
            sativaRatio: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        { timestamps: false }
    );
};
