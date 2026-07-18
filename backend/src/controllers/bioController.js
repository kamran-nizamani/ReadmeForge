const { generateDeveloperBio } = require('../services/bioService');

const createBio = async (req, res, next) => {
  try {
    const { name, topLanguages, topRepos, role } = req.body;

    if (!name || !topLanguages || !Array.isArray(topLanguages) || !topRepos || !Array.isArray(topRepos)) {
      const error = new Error('Invalid payload: name, topLanguages, and topRepos are required.');
      error.status = 400;
      throw error;
    }

    const bio = await generateDeveloperBio({ name, topLanguages, topRepos, role });
    res.json({ bio });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBio };
