const express = require('express');
const { createBio } = require('../controllers/bioController');

const router = express.Router();
router.post('/', createBio);

module.exports = router;
