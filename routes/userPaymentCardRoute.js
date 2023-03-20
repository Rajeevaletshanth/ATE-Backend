const express = require("express");
const router = express.Router();

const controller = require('../controllers/payment/userPaymentCardController');
const {authenticateToken} = require("../auth/authentication")

router.post('/create_customer', controller.create_customer)
router.get('/get_customer/:user_id', controller.get_customer_byID)
router.post('/add_card/:user_id', controller.attach_payment_method)
router.post('/remove_card/:user_id', controller.detach_payment_method)
router.put('/change_primary_card/:user_id', controller.change_primary_card)
router.get('/get_allcards/:user_id', controller.get_allcards_byId)

module.exports = router;