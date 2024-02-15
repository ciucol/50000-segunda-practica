const express = require('express')
const { port } = require('./configs/app.config')

const app = express()

app.listen(port, () => {
  console.log(`Server ${port}`)
})
