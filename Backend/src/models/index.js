const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("../models/role.model");
db.account = require("../models/account.model");



db.ROLES = ["STUDENT","INSTRUCTOR","HEADINSTRUCTOR","MANAGER"]

module.exports = db