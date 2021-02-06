module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    res.status(400).json({ error: err.errors[0].message });
  } else if (err.name === 'CustomError') {
    res.status(err.status).json({ error: err.msg })
  } else if (err.errors[0].type === 'unique violation') {
    res.status(400).json({ error: "Email must be unique!" });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}