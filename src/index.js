const express = require('express');
const crypto = require('crypto');
const utils = require('./utils');
const middlewares = require('./middlewares');

const app = express();
const talkerFile = './talker.json';

app.use(express.json());

app.get('/', (_req, res) => res.status(200).send());

app.get('/talker', (_req, res) => {
    const talkers = utils.getJSONFile(talkerFile);
    return res.status(200).json(talkers);
});

app.get('/talker/search', middlewares.validateAtz, async (req, res) => {
  const talkersList = utils.getJSONFile(talkerFile);
  const { q } = req.query;

  if (!q) {
    return res.status(200).json(talkersList);
  }

  const talkersSearch = talkersList.some((talker) => talker.name.toLowerCase()
    .includes(q.toLowerCase()));

  if (!talkersSearch) {
    return res.status(200).json([]);
  }

  const search = talkersList.filter((talker) => talker.name.toLowerCase()
    .includes(q.toLowerCase()));

  res.status(200).json(search);
});

app.get('/talker/:id', (req, res) => {
  const talkers = utils.getJSONFile(talkerFile);
  const talker = talkers.find(({ id }) => id === Number(req.params.id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

app.post('/talker',
  middlewares.validateAtz,
  middlewares.validationName, 
  middlewares.validationAge,
  middlewares.validationAll,
  middlewares.validationRate,
  (req, res) => {
    const talkersList = utils.getJSONFile(talkerFile);
    const newTalker = { id: talkersList[talkersList.length - 1].id + 1, ...req.body };
    utils.writeJSONFile('./talker.json', [...talkersList, newTalker]);
    res.status(201).json(newTalker);
  });

  app.put('/talker/:id',
  middlewares.validateAtz,
  middlewares.validationName, 
  middlewares.validationAge,
  middlewares.validationAll,
  middlewares.validationRate,
  async (req, res) => {
    const talkersList = utils.getJSONFile(talkerFile);
    const { age, name, talk } = req.body;
    const { id } = req.params;

    talkersList[+(id)] = { id: +(id), name, age, talk };
    utils.writeJSONFile('./talker.json', [...talkersList]);
    return res.status(200).json({ id: +id, ...req.body });
  });

  app.delete('/talker/:id', middlewares.validateAtz, (req, res) => {
    const talkersList = utils.getJSONFile(talkerFile);
    const { id } = req.params;
    const list = talkersList.filter((talker) => talker.id !== +(id));
    utils.writeJSONFile('./talker.json', JSON.stringify(list));
    return res.status(204).json([{ id }]);
  });

app.listen(3000);
