function checkLogStatus(req, res, next) {
  if (req.session._id === undefined) {
    if (req.cookies._id === undefined) {
      return res.sendStatus(403);
    } else {
      req.session._id = req.cookies._id;
      next();
    }
  } else {
    next();
  }
}

module.exports = { checkLogStatus };
