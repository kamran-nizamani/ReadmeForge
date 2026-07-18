const express = require('express');
const { createMarkdown } = require('../controllers/generateController');

const router = express.Router();
router.post('/', createMarkdown);

module.exports = router;
