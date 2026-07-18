const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const githubRoute = require('./routes/github');
const generateRoute = require('./routes/generate');
const bioRoute = require('./routes/bio');
const snapshotRoute = require('./routes/snapshot');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api/github', githubRoute);
app.use('/api/generate', generateRoute);
app.use('/api/generate-bio', bioRoute);
app.use('/api/snapshot', snapshotRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`ReadmeForge backend running on http://localhost:${PORT}`);
});
