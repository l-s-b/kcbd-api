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
const {
    signup,
    login
} = require('../controllers/users');
const { checkAuth } = require('./middleware/checkAuth');
const router = Router();

router.get("/", (req, res) => {
    res.status(200).send('200 OK - Home')
});

router.get("/cron", (req, res) => {
    res.status(200).send('Keep-alive cron')
});

// AUTH
router.post("/signup", signup);
router.post("/login", login);
// PRODUCTS
router.get("/products", getProducts);
router.get("/products/filter", filterProducts);
router.get("/product/:id", getProductByID);
router.post("/product", checkAuth, postProduct);
router.patch("/product/:id?", checkAuth, patchProduct);
router.delete("/product/:id?", checkAuth, deleteProduct);
router.post("/bulk", checkAuth, postBulk);
// MP CHECKOUT
router.post("/create_preference", postPreference);

module.exports = router;
