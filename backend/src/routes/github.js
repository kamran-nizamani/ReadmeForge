const express = require('express');
const { getGithubProfile } = require('../controllers/githubController');

const router = express.Router();
router.get('/:username', getGithubProfile);

module.exports = router;
