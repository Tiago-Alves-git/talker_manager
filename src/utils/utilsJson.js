const fs = require('fs/promises');
const path = require('path');

const writeJsonFile = (filePath, content) => {
  try {
    fs.writeFile(path.resolve(__dirname, '..', filePath), JSON.stringify(content),
    { encoding: 'utf-8' });
    return content;
  } catch (__error) {
    return [];
  }
};

const getJsonFile = async (filePath) => {
  try {
    const res = await fs.readFile(path.resolve(__dirname, '..', filePath), { encoding: 'utf-8' });
    return JSON.parse(res);
  } catch (__error) {
    return [];
  }
};

module.exports = {
  getJsonFile,
  writeJsonFile,
};