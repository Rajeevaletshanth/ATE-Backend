const express = require("express");
const router = express.Router();

const controller = require('../controllers/tableController');
const {adminAuthenticateToken} = require("../auth/authentication");

router.post('/create/:restaurant_id', controller.create)
router.put('/edit/:id', controller.edit)
router.get('/list/:restaurant_id', controller.getAll)
router.get('/:id', controller.getByid)
router.delete('/delete/:id', controller.delete)


module.exports = router;