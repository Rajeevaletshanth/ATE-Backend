const express = require("express");
const router = express.Router();

const controller = require('../controllers/topOffersController');

router.post('/add', controller.create);
router.get('/list', controller.getAll);
router.delete('/remove/:id', controller.delete);

module.exports = router;