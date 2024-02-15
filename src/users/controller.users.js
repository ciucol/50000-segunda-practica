const { Router } = require('express')
const Users = require('../models/Users.model')
const { hashPassword } = require('../utils/bcrypt.util')
const convertToNumber = require('../middlewares/convert-to-number.middleware')
const { authMiddleware } = require('../utils/jwt.util')
const authRoleMiddleware = require('../middlewares/auth-role.middleware')
const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const newUserInfo = {
      name,
      email,
      password: hashPassword(password),
    }

    await Users.create(newUserInfo)

    res.status(201).json({ message: 'New User Created' })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
})

router.get(
  '/',
  authMiddleware,
  authRoleMiddleware(['admin', 'superAdmin', 'analyst']),
  async (req, res) => {
    try {
      const users = await Users.find()

      res.json({ message: users })
    } catch (error) {
      console.log(error)
      res.json({ error })
    }
  }
)

router.get('/:uid', authMiddleware, async (req, res) => {
  try {
    console.log('desde el controller: ', req.user)
    const { uid } = req.params
    const user = await Users.findOne({ _id: uid })

    if (user.id !== req.user.id)
      res.status(403).json({ status: 'error', error: 'Forbiden' })

    res.json({ message: user })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
})

module.exports = router
