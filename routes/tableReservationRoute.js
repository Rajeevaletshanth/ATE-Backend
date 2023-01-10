const express = require("express");
const router = express.Router();

const controller = require('../controllers/tableReservationController');
const {adminAuthenticateToken} = require("../auth/authentication");

router.post('/create/:restaurant_id', controller.create)
router.get('/list/:restaurant_id', controller.getAll)
router.post('/check_availability/:restaurant_id', controller.checkAvailability)
router.get('/:id', controller.getByid)
router.delete('/delete/:id', controller.delete)



module.exports = router;