require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_TYPE, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
    `${DB_TYPE}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
);

// Load models
const modelDir = path.join(path.resolve(__dirname, '../'), 'models');
fs.readdirSync(modelDir).forEach(file => {
  const modelPath = path.join(modelDir, file);
  const model = require(modelPath)(sequelize);
  sequelize.models[model] = model;
});

module.exports = sequelize;
