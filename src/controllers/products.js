const { Product } = require('../db/associations').models;
const productTypes = require('../db/populations');
const productBulk = require('../db/products.json');
const axios = require('axios');
const { Op } = require('sequelize');
require('dotenv').config();
const { SERVER } = process.env;

const ENTITY = "Product"

const PRODUCT_ORDER = {
    order: [
        ["stock", "DESC"]
        ["id", "ASC"],
    ]
}

const getProducts = async (req, res) => {
/* DO NOT POPULATE PRODUCTS HERE (or only if needed) */
    try {
        const products = await Product.findAll(PRODUCT_ORDER)
        res.status(200).send(products)
    } catch (error) {
        console.error(error)
        res.status(400).send(`${ENTITY} list GET error!`)
    }
};

const filterProducts = async (req, res) => {
    let { where, order } = req.body;
    const sequelizeWhere = {}
    for (filter in where) {
        sequelizeWhere[filter] = {
            [Op.eq]: where[filter]
        }
    }
    const include = Object.keys(productTypes).map(
        x => productTypes[x].include
    )
    try {
        const products = await Product.findAll({
            include,
            where: sequelizeWhere,
            ...PRODUCT_ORDER
        })
        res.status(200).send(products)
    } catch (error) {
        console.error(error)
        res.status(400).send(`${ENTITY} list GET error!`)
    }
};

const getProductByID = async (req, res, argID) => {
    try {
        const id = req.body.id || req.params.id || argID;
        if (!parseInt(id)) {
            return res.status(404).send("Wrong ID data type (not number).");
        }
        const product = await Product.findByPk(id)
        if (!product) { return res.status(404).send(
            `${ENTITY} #${id} not found. Results here: ${product}`
        ) }
        const { include } = productTypes[product.type];
        const populatedProduct = await Product.findByPk(id, { include })
        if (populatedProduct) {
            res.status(200).send(populatedProduct.dataValues)
        } 
    } catch (error) {
        console.error(error)
        res.status(400).send(`${ENTITY} detail GET error!`)
    }
};

const postProduct = async (req, res) => {
    try {
        const { type } = req.body.product;
        const { include, setMethod } = productTypes[type];
        let [postedProduct, wasPosted] = await Product.findOrCreate({
            where: {...req.body.product}
        })
        if (!wasPosted) { return res.status(301).json("Already created"); }
        const population = wasPosted && await include.model.create({
            ...req.body[type]
        })      
        if (!population) { 
            return res.status(400).json("Population error");
        } else { 
            await postedProduct[setMethod](population);
            getProductByID(req, res, postedProduct.id)
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(`${ENTITY} POST error!`)
    }
};

const patchProduct = async (req, res) => {
    const id = req.body.id || req.params.id;
    const changes = req.body;
    try {
        const update = await Product.update(
            changes,
            { where: {id} }
        )
        if (update[0] === 0) {
            return res.status(404).send(`Could not patch ${ENTITY} (not found).`)
        } else {
            getProductByID(req, res, id);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(`${ENTITY} PATCH error!`)
    }
};

const deleteProduct = async (req, res) => {
    const id = req.body.id || req.params.id;
    try {
        const deleted = await Product.destroy(
            { where: {id} }
        )
        if (deleted === 1 ) {
            res.status(200).send('Deleted!')
        } 
        if (deleted === 0) {
            res.status(404).send(`Could not delete ${ENTITY} (not found)`)
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(`${ENTITY} DELETE error!`)
    }
};

const postBulk = async (req, res ) => {
    try {
      const postedBulk = await Promise.all(
        productBulk.map(async (p) => {
            await axios.post(`${SERVER}/product`, p);
        })
      );
      postedBulk && console.log('Finished bulk creation')
      postedBulk && res.status(200).send('Finished bulk creation');
    } catch (error) {
      console.error(error);
      res.status(400).send(`${ENTITY} bulk creation error!`)
    }
  }

module.exports = {
    getProducts,
    filterProducts,
    getProductByID,
    postProduct,
    patchProduct,
    deleteProduct,
    postBulk
};