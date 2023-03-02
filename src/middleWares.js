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

module.exports = {
  validEmail,
  validPassword,
};