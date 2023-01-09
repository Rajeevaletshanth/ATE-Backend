const express = require("express");
const router = express.Router();

const controller = require('../controllers/orderController');
const { adminAuthenticateToken } = require("../auth/authentication")

router.post('/create', controller.create)
router.put('/edit/:id', controller.edit)
router.get('/:id', controller.getByid)
router.get('/all_orders/:user_id', controller.getOrdersByUserId)
router.get('/all_restaurant_orders/:restaurant_id', controller.getAllrestarantOrders)
router.get('/get_status/:id', controller.getStatusByid)
router.delete('/delete/:id', controller.delete)


module.exports = router;