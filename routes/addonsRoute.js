const express = require("express");
const router = express.Router();

const controller = require('../controllers/addonsController');
const {adminAuthenticateToken} = require("../auth/authentication")

router.post('/create', controller.create)
router.get('/list/:restaurant_id', controller.getAll)
router.get('/:id', controller.getByid)
router.post('/multiple', controller.getByMultipleIds)
router.delete('/delete/:id', controller.delete)
router.put('/edit/:id', controller.edit)

module.exports = router;