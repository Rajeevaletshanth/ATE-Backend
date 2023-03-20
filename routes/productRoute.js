const express = require("express");
const router = express.Router();

const controller = require('../controllers/payment/productController');
const {adminAuthenticateToken} = require("../auth/authentication")

router.post('/create', controller.create)
router.get('/list', controller.getAll)
router.get('/:id', controller.getByid)
router.delete('/delete/:id', controller.delete)
router.put('/edit/:id', controller.edit)

router.get('/category/:category_id', controller.getProductByCategoryid)
// router.get('/combo/:id', controller.getComboMenuPack)

router.get('/restaurant/:restaurant_id', controller.getProductByRestaurantId)


module.exports = router;