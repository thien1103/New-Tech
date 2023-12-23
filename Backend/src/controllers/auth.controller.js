// // auth.controller.js
// const Student = require('../models/student.model');
// const Manager = require('../models/manager.model');
// const Instructor = require('../models/instructor.model');

// const config = require("../config/authConfig");

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const Role = require('../models/role.model'); // Update the path to your role model
const Account = require('../models/account.model'); // Update the path to your account model


const Instructor = require('../models/instructor.model');
const Student = require('../models/student.model');
const Manager = require('../models/manager.model');
const { ObjectId } = require('mongoose').Types;



exports.signup = async (req, res) => {
  try {
    const { accountID, username, email, password, roles } = req.body;

    // Check if the accountID corresponds to a Student or Instructor
    const isStudent = await Student.exists({ _id: accountID });
    const isInstructor = await Instructor.exists({ _id: accountID });
    const isManager = await Manager.exists({_id: accountID});

    if (!isStudent && !isInstructor && !isManager) {
      return res.status(400).send({ message: 'Invalid accountID. Must be a valid Student or Instructor ID.' });
    }

    const user = new Account({
      accountID: new ObjectId(accountID), // Create an ObjectId instance 
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    await user.save();

    let userRoles;
    if (roles) {
      userRoles = await Role.find({
        name: { $in: roles },
      });
    } else {
      // Default role for a new user
      userRoles = await Role.findOne({ name: "STUDENT" });
    }

    if (userRoles) {
      user.roles = Array.isArray(userRoles) ? userRoles.map(role => role._id) : [userRoles._id];
      await user.save();
    }

    res.send({ message: "User was registered successfully!" });
  }  catch (err) {
    console.error('Error in signup:', err);
    res.status(500).send({ message: 'Internal Server Error.' });
  }
  
};


exports.signin = async (req, res) => {
  try {
    const user = await Account.findOne({
      username: req.body.username
    }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            });

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user.accountID,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

