const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productscontroller');

router.post('/', productsController.createProduct)
router.get('/', productsController.getProducts);
router.get('/:id',productsController.getProductById);
router.patch('/:id',productsController.updateProduct);
router.delete('/:id',productsController.deleteProduct);

module.exports = router;
