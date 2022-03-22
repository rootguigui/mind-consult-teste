const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports.connectDB = function(url) {
  mongoose.connect(url)
    .then(async (_) => {
      console.log('[SERVER] Database was connected!');

      // -- insert admin to database
      const admin = await User.findOne({ email: 'guilhermealmeida48@gmail.com' });
      if (admin == null) {
        const hashed_password = await bcrypt.hash('abc!1234',Number(process.env.SALTROUNDS));
        const user = new User({ email: 'guilhermealmeida48@gmail.com', password: hashed_password, userType: 'admin' })
        await user.save();
        console.log('usuário admin cadastrado!')
      }
    })
    .catch(err => console.log('[SERVER] One error was occured when try to connect to database.', err));
}