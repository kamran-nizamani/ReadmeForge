const { fetchGithubUserData } = require('../services/githubService');

const getGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await fetchGithubUserData(username);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGithubProfile,
};
