const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../configs/app.config')

const generateToken = tokenInfo => {
  return jwt.sign(tokenInfo, jwtSecret, {
    expiresIn: '24h',
  })
}

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders)
    return res.status(401).json({ status: 'error', error: 'Unauthorized' })

  const token = authHeaders.split(' ')[1]

  jwt.verify(token, jwtSecret, (error, credentials) => {
    if (error) res.json({ error })

    const userInfo = {
      id: credentials.id,
      email: credentials.email,
      role: credentials.role,
    }

    req.user = userInfo

    done(null, credentials)

    next()
  })
}

module.exports = {
  generateToken,
  authMiddleware,
}
