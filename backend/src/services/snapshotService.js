const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const snapshotsDir = path.join(__dirname, '../../public/snapshots');
const stableRoutes = {
  'tech-orbit': '/snapshot/tech-orbit',
  'contribution-chart': '/snapshot/contribution-chart',
};

const ensureSnapshotsDir = () => {
  if (!fs.existsSync(snapshotsDir)) {
    fs.mkdirSync(snapshotsDir, { recursive: true });
  }
};

const buildCacheKey = (sceneType, config) => {
  const hash = crypto.createHash('sha256');
  hash.update(sceneType + JSON.stringify(config || {}));
  return hash.digest('hex').slice(0, 16);
};

const generateSceneSnapshot = async (sceneType, config) => {
  ensureSnapshotsDir();
  if (!stableRoutes[sceneType]) {
    throw new Error('Unsupported sceneType.');
  }

  const cacheKey = buildCacheKey(sceneType, config);
  const filename = `${sceneType}-${cacheKey}.png`;
  const filepath = path.join(snapshotsDir, filename);

  if (fs.existsSync(filepath)) {
    return `/snapshots/${filename}`;
  }

  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    const baseUrl = process.env.FRONTEND_SNAPSHOT_BASE_URL || 'http://localhost:5173';
    const route = stableRoutes[sceneType];
    await page.setViewport({ width: 1200, height: 700, deviceScaleFactor: 2 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: filepath, fullPage: false });
  } finally {
    await browser.close();
  }

  return `/snapshots/${filename}`;
};

module.exports = { generateSceneSnapshot, buildCacheKey };
