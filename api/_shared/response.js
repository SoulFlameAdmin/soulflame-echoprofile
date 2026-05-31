function json(res, status, data) {
  res.status(status).json(data);
}

module.exports = { json };
