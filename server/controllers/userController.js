const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class userController {
  static async register(req, res, next) {
    let { full_name, email, password } = req.body;
    try {
      let newUser = await User.create({ full_name, email, password }, { returning: true });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        const comparedPassword = comparePassword(password, user.password);
        if (!comparedPassword) throw {
          name: 'CustomError',
          msg: 'Email or password is incorrect!',
          status: 404
        }
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token });
      } else {
        throw {
          name: 'CustomError',
          msg: 'Email or password is incorrect!',
          status: 404
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;