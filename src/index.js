const express = require('express');

const utils = require('./utils/utilsJson');

const talkerFile = 'talker.json';

const token = require('./utils/randomToken');
const { validEmail, validPassword, validAuthorization,
  validUserName, validUserAge, validUserRate, validUserTalk } = require('./middleWares');

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
  res.status(HTTP_OK_STATUS).json({ token: `${token()}` });
});

app.post('/talker', 
validAuthorization, 
validUserName, 
validUserAge, 
validUserTalk, 
validUserRate, 
async (req, res) => {
  const talkerList = await utils.getJsonFile(talkerFile);
  const newUser = { id: talkerList[talkerList.length - 1].id + 1, ...req.body };
  const updateTalkers = [...talkerList, newUser];
  await utils.writeJsonFile(talkerFile, updateTalkers);
  return res.status(201).json(newUser);
});

app.put('/talker/:id', 
validAuthorization, 
validUserName, 
validUserAge, 
validUserTalk, 
validUserRate, 
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerList = await utils.getJsonFile(talkerFile);
  talkerList[+(id)] = { id: +(id), name, age, talk };

  await utils.writeJsonFile(talkerFile, [...talkerList]);
  return res.status(200).json({ id: +id, ...req.body });
});

app.delete('/talker/:id', validAuthorization, async (req, res) => {
  const { id } = req.params;
  const talkerList = await utils.getJsonFile(talkerFile);
  const userToDelete = talkerList.findIndex((user) => user.id === Number(id));
  talkerList.splice(userToDelete, 1);
  console.log(talkerList);
  await utils.writeJsonFile(talkerFile, talkerList);
  return res.status(204).json({ });
});

app.listen(PORT, () => {
  console.log(`Online1, ${PORT} `);
});
