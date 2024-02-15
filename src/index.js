const express = require('express')
const { port } = require('./configs/app.config')
const mongoConnect = require('./db')
const router = require('./router')

const app = express()

app.use(express.json())

mongoConnect()

router(app)

app.listen(port, () => {
  console.log(`Server ${port}`)
})
