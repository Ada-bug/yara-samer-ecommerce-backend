const express = require('express');
const router = express.Router();

const cartContoller = require('../controllers/cartcontroller');

router.post('/items', cartContoller.addItem)
router.get('/', cartContoller.getCart);
router.patch('/items/:productId', cartContoller.updateQuantity);
router.delete('/items/:productId', cartContoller.removeItem);
router.delete('/', cartContoller.emptyCart);

module.exports = router;