const express = require('express');
const { getGithubProfile, getContributionCalendar } = require('../controllers/githubController');

const router = express.Router();
router.get('/:username/contributions', getContributionCalendar);
router.get('/:username', getGithubProfile);

module.exports = router;
