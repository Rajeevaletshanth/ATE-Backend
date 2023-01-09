const express = require("express");
const router = express.Router();

const controller = require('../controllers/superadminController');
const {adminAuthenticateToken} = require("../auth/authentication")


router.post('/create', adminAuthenticateToken, controller.create)
router.get('/list', adminAuthenticateToken, controller.getAll)
router.get('/:id', adminAuthenticateToken, controller.getByid)
router.post('/get_bymail', adminAuthenticateToken, controller.getByEmail)
router.put('/access_control/:id', adminAuthenticateToken, controller.access_control)
router.delete('/delete/:id', adminAuthenticateToken, controller.delete)

module.exports = router;