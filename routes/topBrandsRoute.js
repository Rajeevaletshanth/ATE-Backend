const express = require("express");
const router = express.Router();

const controller = require('../controllers/topBrandsController');

router.get('/add/:restaurant_id', controller.create);
router.get('/list', controller.getAll);
router.delete('/remove/:id', controller.delete);

module.exports = router;