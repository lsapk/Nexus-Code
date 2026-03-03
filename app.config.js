const fs = require('fs');
const path = require('path');

const baseConfig = require('./app.json');

const PNG_1X1_BLUE =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFAAH/e+m+7wAAAABJRU5ErkJggg==';
const PNG_1X1_DARK =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWPg5eVlPQAHYwLRQfN6mQAAAABJRU5ErkJggg==';

function ensurePng(relativePath, base64Png) {
  const absolutePath = path.join(__dirname, relativePath);
  const dirPath = path.dirname(absolutePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(absolutePath)) {
    fs.writeFileSync(absolutePath, Buffer.from(base64Png, 'base64'));
  }
}

module.exports = () => {
  ensurePng('assets/icon.png', PNG_1X1_BLUE);
  ensurePng('assets/adaptive-icon.png', PNG_1X1_DARK);
  ensurePng('assets/favicon.png', PNG_1X1_BLUE);

  return {
    ...baseConfig,
    expo: {
      ...baseConfig.expo,
      icon: './assets/icon.png',
      android: {
        ...baseConfig.expo.android,
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#0f172a',
        },
      },
      web: {
        ...baseConfig.expo.web,
        favicon: './assets/favicon.png',
      },
    },
  };
};
