const validateEmail = (req, res, next) => {
  if (!req.body.email || req.body.email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(req.body.email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  if (!req.body.password || req.body.password.length === 0) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateAtz = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body; if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
 return res.status(400).json({
      message: 'O campo "age" deve ser um "number" do tipo inteiro',
    });
  }
  if (age < 18) { 
    return res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const validationAll = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
    const { watchedAt } = talk;
    if (!watchedAt) {
      return res
        .status(400)
        .json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(talk.watchedAt)) {
      return res
        .status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
  }
  next();
};
    const validationRate = (req, res, next) => {
        const { talk } = req.body;
        if ((talk.rate < 1 || talk.rate > 5)) {
            return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }
        if (!talk.rate) {
            return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
        }
        if (Math.floor(talk.rate) !== talk.rate) {
            return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }
        next();
    };

module.exports = {
  validateEmail,
  validatePassword,
  validateAtz,
  validationName,
  validationAge,
  validationAll,
  validationRate,
};