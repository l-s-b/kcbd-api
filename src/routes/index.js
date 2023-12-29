const { Router } = require('express');
const {
    getProducts,
    filterProducts,
    getProductByID,
    postProduct,
    patchProduct,
    deleteProduct,
    postBulk
} = require('../controllers/products');
const {
    postPreference
} = require('../controllers/mp');
const router = Router();

router.get("/", (req, res) => {
    res.status(200).send('200 OK - Home')
});

router.get("/cron", (req, res) => {
    res.status(200).send('Keep-alive cron')
});

router.get("/products", getProducts);
router.get("/products/filter", filterProducts);
router.get("/product/:id", getProductByID);
router.post("/product", postProduct);
router.patch("/product/:id?", patchProduct);
router.delete("/product/:id?", deleteProduct);
router.post("/bulk", postBulk);

router.post("/create_preference", postPreference);

module.exports = router;
