const express = require('express');
const shelterController = require('../controllers/shelterController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', shelterController.getShelters);
router.get('/:id', shelterController.getShelterById);
router.post('/', authMiddleware, shelterController.createShelter);
router.put('/:id', authMiddleware, shelterController.updateShelter);

module.exports = router;
