const express = require("express");
const router = express.Router();

const controller = require('../controllers/favouriteController');
const { adminAuthenticateToken } = require("../auth/authentication")

router.post('/add_to_fav', controller.create)
router.get('/get_all_fav/:id', controller.getAll)
router.get('/:id', controller.getByid)
router.post('/remove/:id', controller.remove)
router.delete('/delete/:id', controller.delete)

module.exports = router;