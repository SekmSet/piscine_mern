const isAdmin = (req, res, next) => {
  if (req.session.user.admin === false) {
    req.flash('danger', 'You are not an admin ');
    res.writeHead(302, {'Location': '/'});
    return res.end();
  }

  return next();
};

module.exports = isAdmin;