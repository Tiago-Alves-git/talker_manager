const validEmail = (req, res, next) => {
  if (!req.body.email || req.body.email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(req.body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validPassword = (req, res, next) => {
  if (!req.body.password || req.body.password.leng === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validAuthorization = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth.length === 0) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (typeof auth !== 'string' || auth.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
next();
};

const validUserName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validUserAge = (req, res, next) => {
  const { age } = req.body; 
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  } if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  } if (age < 18) { 
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
  next();
};

const validUserTalk = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
  if (!talk || talk.length === 0) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } 
  const { watchedAt } = talk;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validUserRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
} if (!rate) {
  return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
} if (Math.floor(rate) !== rate) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};

module.exports = {
  validEmail,
  validPassword,
  validAuthorization,
  validUserName,
  validUserAge,
  validUserTalk,
  validUserRate,
};