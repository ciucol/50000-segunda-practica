const authController = require('../auth/controller.auth')
const usersControllers = require('../users/controller.users')

const router = app => {
  app.use('/auth', authController)
  app.use('/users', usersControllers)
}

module.exports = router
