const express = require('express');
const { createSnapshot } = require('../controllers/snapshotController');

const router = express.Router();
router.post('/', createSnapshot);

module.exports = router;
