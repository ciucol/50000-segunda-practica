const { Router } = require('express')
const Users = require('../models/Users.model')
const { passwordIsValidated } = require('../utils/bcrypt.util')
const { generateToken } = require('../utils/jwt.util')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await Users.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Bad Request' })

    if (!passwordIsValidated(password, user))
      return res.status(400).json({ error: 'Bad Request' })

    const tokenInfo = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const token = generateToken(tokenInfo)

    res.json({ message: 'Logged', token })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
})

module.exports = router
