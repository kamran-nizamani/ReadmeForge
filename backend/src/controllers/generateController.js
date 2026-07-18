const { generateMarkdown } = require('../services/markdownService');

const createMarkdown = async (req, res, next) => {
  try {
    const { userData, template, config } = req.body;
    if (!userData || !userData.profile) {
      const error = new Error('Invalid payload: userData.profile is required.');
      error.status = 400;
      throw error;
    }

    const markdown = generateMarkdown(userData, template, config);
    res.json({ markdown });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMarkdown,
};
