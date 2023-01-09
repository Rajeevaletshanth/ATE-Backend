const express = require("express");
const router = express.Router();

const controller = require('../controllers/adminController');
const {authenticateToken} = require("../auth/authentication")


// router.get('/login', controller.getlogin);
// router.get('/logout', controller.logout);
// router.post('/login', controller.postlogin);
// router.get('/getalladmin', controller.getAlladmin);
// router.put('/suspendAdmin/:admin_id', controller.suspendAdmin);
// router.put('/activateAdmin/:admin_id', controller.activateAdmin);
// router.put('/updateuser/:admin_id', controller.changeUsername);
// router.post('/checkpassword', controller.checkOldPassword);
// router.put('/changenewpassword', controller.changeNewPassword);


router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/:id', authenticateToken, controller.getByid)
router.post('/get_admin', authenticateToken, controller.getByEmail)
router.put('/edit/:id', authenticateToken, controller.editProfile)
router.post('/forgot_password', controller.forgot_password)
router.put('/change_password/:id', authenticateToken, controller.change_password)
router.post('/reset_password/:id/:token', controller.reset_password)
// router.put('/access_control/:id', authenticateToken, controller.access_control)
router.delete('/delete/:id', authenticateToken, controller.delete)

module.exports = router;