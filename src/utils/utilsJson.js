const fs = require('fs');
const path = require('path');

const writeJsonFile = (filePath, content) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(content),
    { encoding: 'utf-8' });
    return content;
  } catch (__error) {
    return [];
  }
};

const getJsonFile = (filePath) => {
  try {
    const res = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
    return JSON.parse(res);
  } catch (__error) {
    return [];
  }
};

module.exports = {
  getJsonFile,
  writeJsonFile,
};