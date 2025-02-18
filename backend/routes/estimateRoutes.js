const express = require('express');
const estimateController = require('../controllers/estimateController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/', estimateController.createEstimate);
router.get('/', estimateController.getEstimates);
router.put('/:id', estimateController.updateEstimate);
router.get('/:id', estimateController.gotEstimate);


module.exports = router;