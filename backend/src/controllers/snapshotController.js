const { generateSceneSnapshot } = require('../services/snapshotService');

const createSnapshot = async (req, res, next) => {
  try {
    const { sceneType, config } = req.body;
    if (!sceneType) {
      const error = new Error('sceneType is required.');
      error.status = 400;
      throw error;
    }

    const snapshotUrl = await generateSceneSnapshot(sceneType, config);
    res.json({ snapshotUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSnapshot };
