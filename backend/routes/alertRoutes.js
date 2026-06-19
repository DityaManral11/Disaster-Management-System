const express = require('express');
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', alertController.getAlerts);
router.post('/', authMiddleware, alertController.createAlert);
router.put('/:id', authMiddleware, alertController.updateAlert);
router.delete('/:id', authMiddleware, alertController.deleteAlert);

module.exports = router;
