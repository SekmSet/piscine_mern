const isAuth = (req, res, next) => {
  if (req.session.user === undefined) {
    req.flash('danger', 'You are not log ');
    res.writeHead(302, {'Location': '/login'});
    return res.end();
  }

  return next();
};

module.exports = isAuth;