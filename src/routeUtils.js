function checkLogStatus(req, res, next) {
  if (req.session._id === undefined) {
    return res.sendStatus(403);
  } else {
    next();
  }
}

module.exports = { checkLogStatus };
