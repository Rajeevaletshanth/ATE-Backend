const express = require("express");
const router = express.Router();

const controller = require('../controllers/payment/paymentController');
const {authenticateToken} = require("../auth/authentication")

router.post('/create_draft_invoice', controller.create_draft_invoice)
router.post('/direct_payment', controller.direct_payment)
router.post('/checkout_session', controller.checkout_session)
router.post('/capture_payment', controller.capture_payment)

module.exports = router;