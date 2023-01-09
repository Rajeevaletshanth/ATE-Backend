const express = require("express");
const router = express.Router();

const controller = require('../controllers/categoryController');
const { adminAuthenticateToken } = require("../auth/authentication")

router.post('/create', controller.create)
router.get('/list', controller.getAll)
router.get('/name_list', controller.getAllNames)
router.get('/:id', controller.getByid)
router.delete('/delete/:id', controller.delete)
router.put('/edit/:id', controller.edit)

router.get('/restaurant/:id', controller.getByRestaurantId);

module.exports = router;