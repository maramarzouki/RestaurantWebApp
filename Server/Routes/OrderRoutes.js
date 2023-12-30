const Order = require('../Controllers/OrderControllers');
const Router = require('express');
const router = Router();

router.post('/createOrder', Order.createOrder);
router.get('/getOrder/:orderID', Order.getOrderDetails);
router.get('/getAllOrders/:customerID', Order.getAllOrders);
router.put('/updateOrder/:orderID', Order.updateOrder);
router.delete('/deleteOrder/:orderID', Order.deleteOrder);

module.exports = router;