const jwt = require('jsonwebtoken');

const authRoutes = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) return res.status(401).send({ error: true, data: null, message: 'O token precisa ser informado' })
  const token = header.split(' ')[1];  

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ error: true, message: 'Token não autenticado' });

    req._id = decoded._id;
    next();
  });
}

module.exports.authRoutes = authRoutes;