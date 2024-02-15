const bcrypt = require('bcrypt')

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const passwordIsValidated = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}

module.exports = {
  hashPassword,
  passwordIsValidated,
}
