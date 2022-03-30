const errorHandler = (err, req, res, next) => {
  res.json({ success: false, message: err.message });
};

module.exports = errorHandler;
