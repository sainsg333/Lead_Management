const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

router.post('/', leadController.createLead);
router.get('/', leadController.getLeads);
router.put('/:id', leadController.updateLead);
router.get('/:id', leadController.gotLead);
module.exports = router;