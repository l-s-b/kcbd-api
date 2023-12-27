// Define associations
const sequelize = require('./models');
const { Product, OilData, SeedData, LotionData, MerchData, User, Cart } = sequelize.models;

Product.hasOne(SeedData, { as: "seedpack", foreignKey: 'productId' });
SeedData.belongsTo(Product, { foreignKey: 'productId' });

Product.hasOne(OilData, { as: "oil", foreignKey: 'productId' });
OilData.belongsTo(Product, { foreignKey: 'productId' });

Product.hasOne(LotionData, { as: "lotion", foreignKey: 'productId' });
LotionData.belongsTo(Product, { foreignKey: 'productId' });

Product.hasOne(MerchData, { as: "merch", foreignKey: 'productId' });
MerchData.belongsTo(Product, { foreignKey: 'productId' });

Cart.hasMany(Product, { foreignKey: 'cartId' });
Product.belongsTo(Cart, { foreignKey: 'cartId' })

User.hasOne(Cart);
Cart.belongsTo(User);

module.exports = sequelize;
