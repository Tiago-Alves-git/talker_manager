const fs = require('fs');
const path = require('path');

const writeJSONFile = (filePath, content) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), 
    JSON.stringify(content), { encoding: 'utf8' });
    return content;
  } catch (_err) {
    return false;
  }
};

const getJSONFile = (filePath) => {
  try {
    const res = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf8' });
    return JSON.parse(res);
  } catch (_err) {
    return [];
  }
};

module.exports = {
    getJSONFile,
    writeJSONFile,
};