const express = require('express');

const utils = require('./utils/utilsJson');

const talkerFile = './talker.json';

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3004';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online1');
});

app.get('/talker', (req, res) => {
  const talkers = utils.getJsonFile(talkerFile);
  return res.status(HTTP_OK_STATUS).JSON(talkers);
});
