const { DataTypes } = require('sequelize');

module.exports = Product = (sequelize) => {
    const placeholder = "https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T812A1PA3811PT17X26Y38D154218398FS3561/views/1/hanfblatt-maenner-premium-t-shirt.jpg";
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['seedpack', 'oil', 'lotion'],
            allowNull: false,
        },
        stock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        mainImage: {
            type: DataTypes.STRING,
            defaultValue: placeholder
        },
        desc: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    });
};