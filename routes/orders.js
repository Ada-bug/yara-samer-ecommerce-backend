const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderscontroller');

router.post('/', orderController.checkout)
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;

