module.exports.initSession = (req, res, next) => {
  if (req.session.isInit == undefined) {
    console.log("called");
    req.session.isInit = true;
    req.session.user = {};
    req.session.isAuth = false;
    req.session.isAdmin = false;
    req.session.isUser = false;
    
    if (req.cookies.cart == undefined) {
      res.cookie(
        "cart",
        JSON.stringify({
          games: [],
          consoles: [],
        })
      );

      req.cookies.cart = JSON.stringify({
        games: [],
        consoles: [],
      })
    }
   
  } 
  next();
};

module.exports.resetSession = (req, res) => {
  req.session.isInit = true;
  req.session.user = {};
  req.session.isAuth = false;
  req.session.isAdmin = false;
  req.session.isUser = false;
};

module.exports.setGlobals = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.isUser = req.session.isUser;
  res.locals.user = req.session.user;
  res.locals.shoppingcart =
    req.cookies.cart == undefined
      ? {
          games: [],
          consoles: [],
        }
      : JSON.parse(req.cookies.cart);
  next();
};

module.exports.protectedAdmin = function (req, res, next) {
  if (!req.session.isAuth) {
    res.redirect("/admin/login");
  } else if (req.session.isAuth && req.session.isUser) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports.protectedUser = function (req, res, next) {
  if (!req.session.isAuth) {
    res.redirect("/login");
  } else if (req.session.isAuth && req.session.isAdmin) {
    res.redirect("/admin");
  } else {
    next();
  }
};
