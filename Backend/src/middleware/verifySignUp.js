const db = require("../models");
const ROLES = db.ROLES;
const Account = db.account;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check username
    const existingUsername = await Account.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Check email
    const existingEmail = await Account.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;