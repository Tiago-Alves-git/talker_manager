const fs = require('fs/promises');
const path = require('path');

const writeJsonFile = async (filePath, content) => {
  try {
    await fs.writeFile(path.resolve(__dirname, '..', filePath), JSON.stringify(content, null, 2),
    { encoding: 'utf-8' });
  } catch (error) {
    console.log(error);
    return false;
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