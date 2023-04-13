const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
router.post('/add', productController.createProduct);
router.get('/list/:id', productController.getProductById);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);


router.get('/list', productController.getProducts);





module.exports = router;
