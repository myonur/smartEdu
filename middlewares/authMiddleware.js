const User = require('../models/User');

module.exports = async (req, res, next) => {
  const user = await User.findById(userIN);
  if (!user) return res.redirect("/login");
  next();
};