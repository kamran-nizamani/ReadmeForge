const { fetchGithubUserData, fetchContributionCalendar } = require('../services/githubService');

const getGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await fetchGithubUserData(username);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const getContributionCalendar = async (req, res, next) => {
  try {
    const { username } = req.params;
    const calendar = await fetchContributionCalendar(username);
    res.json(calendar);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGithubProfile,
  getContributionCalendar,
};
