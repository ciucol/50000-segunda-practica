const convertToNumber = (req, res, next) => {
  req.params.uid = Number(req.params.uid)

  next()
}

module.exports = convertToNumber
