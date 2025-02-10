const express = require('express');
const estimateController = require('../controllers/estimateController');

const router = express.Router();

router.post('/', estimateController.createEstimate);
router.get('/', estimateController.getEstimates);
router.put('/:id', estimateController.updateEstimate);
router.get('/:id', estimateController.gotEstimate);


module.exports = router;