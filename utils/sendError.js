const sendError = (code, message, req, res) => {
  res.status(code);
  throw new Error(message);
};

module.exports = sendError;
