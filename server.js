const express = require('express');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

app.get('*.*', express.static(DIST_FOLDER));
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(DIST_FOLDER, 'index.html'));
});
app.listen(PORT, () => {
});

