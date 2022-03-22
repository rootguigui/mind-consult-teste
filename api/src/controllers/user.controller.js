const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    if (email && email == "") return res.status(400).send({ error: true, data: null, message: 'O e-mail é obrigatório!' })
    if (password && password == "") return res.status(400).send({ error: true, data: null, message: 'A senha é obrigatório!' })
    
    const user = await User.findOne({ email: email.trim() });

    if (!user) return res.status(400).send({ error: true, data: null, message: 'E-mail ou senha incorreto!' })
    
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const  { _id, userType } = user;
      const token = jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: '2 days' 
      });

      const isAdmin = userType === 'admin';

      return res.status(200).send({ error: false, data: { token, _id, isAdmin }, message: 'usuário autenticado com sucesso!' });
    }

    return res.status(400).send({ error: true, data: null, message: 'A senha informada está incorreta!' });
  }

  async register(req, res) {
    try{
      const { email, password } = req.body;
      const encryptedPass = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
      const userEmail = await User.findOne({ email });

      if (userEmail) return res.status(200).send({ error: true, data: null, message: 'usuário já cadastrado com esse e-mail!' })

      const user = new User({
        email,
        password: encryptedPass,
        userType: 'user'
      });

      const result = await user.save(); 

      if (result) {
        const  { _id } = result;
        const token = jwt.sign({ _id }, process.env.SECRET, {
          expiresIn: '2 days' 
        });

        return res.status(200).send({ error: false, data: { token }, message: 'usuário cadastrado com sucesso!' });
      }
      
      return res.status(400).send({ error: true, data: null, message: "Ocorreu um erro ao cadastrar o usuário" });
    }
    catch(ex) {
      return res.status(500).send({ error: true, data: null, message: ex.message });
    }
  }
}

module.exports.UserController = new UserController();