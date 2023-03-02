const express = require('express');

const utils = require('./utils/utilsJson');

const talkerFile = 'talker.json';

const token = require('./utils/randomToken');
const { validEmail, validPassword } = require('./middleWares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await utils.getJsonFile(talkerFile);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await utils.getJsonFile(talkerFile);
  const talkersFiltered = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talkersFiltered) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(HTTP_OK_STATUS).json(talkersFiltered);
});

app.get('/login', async (req, res) => {
  const tudoOk = 'tudo okay';
  return res.status(HTTP_OK_STATUS).json({ message: `${tudoOk}` });
});

app.post('/login', validEmail, validPassword, async (req, res) => {
  console.log(req.body);
  res.status(HTTP_OK_STATUS).json({ token: `${token()}` });
});

app.listen(PORT, () => {
  console.log(`Online1, ${PORT} `);
});
