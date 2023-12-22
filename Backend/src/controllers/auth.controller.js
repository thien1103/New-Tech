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

// exports.signup = async (req, res) => {
//   try {
//     const user = new Account({
//       accountID: req.body.accountID,
//       username: req.body.username,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });

//     await user.save();

//     let roles;
//     if (req.body.roles) {
//       roles = await Role.find({
//         name: { $in: req.body.roles },
//       });
//     } else {
//       roles = await Role.findOne({ name: "STUDENT" });
//     }

//     if (roles) {
//       user.roles = Array.isArray(roles) ? roles.map((role) => role._id) : [roles._id];
//       await user.save();
//     }

//     res.send({ message: "User was registered successfully!" });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

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

// exports.signup = (req, res) => {
//   const user = new Account({
  
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   });

//   user.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (req.body.roles) {
//       Role.find(
//         {
//           name: { $in: req.body.roles }
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           user.roles = roles.map(role => role._id);
//           user.save(err => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }

//             res.send({ message: "User was registered successfully!" });
//           });
//         }
//       );
//     } else {
//       Role.findOne({ name: "STUDENT" }, (err, role) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         user.roles = [role._id];
//         user.save(err => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           res.send({ message: "User was registered successfully!" });
//         });
//       });
//     }
//   });
// };


// exports.signup = async (req, res) => {
//   try {
//     const hashedPassword = bcrypt.hashSync(req.body.password, 8);

//     const account = await Account.create({
//       accountID: req.body.accountID,
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     if (req.body.roles) {
//       const roles = await Role.find({ name: { $in: req.body.roles.map(role => role.toLowerCase()) } });
//       account.roles = roles.map(role => role._id);
//       console.log("Hello: ", account.roles);
//     } else {
//       // Default role if none provided
//       const defaultRole = await Role.findOne({ name: 'STUDENT' }); // Adjust to lowercase
//       account.roles = [defaultRole._id];
//     }

//     await account.save();
//     res.send({ message: 'User registered successfully!' });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };




// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Try to find a student by email
//     let user = await Student.findOne({ email });

//     // If not found, try to find a manager by email
//     if (!user) {
//       user = await Manager.findOne({ email });
//     }

//     // If not found, try to find an instructor by email
//     if (!user) {
//       user = await Instructor.findOne({ email });
//     }

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password matches
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Authentication successful
//     let userType;
//     if (user instanceof Manager) {
//       userType = 'manager';
//     } else if (user instanceof Student) {
//       userType = 'student';
//     } else if (user instanceof Instructor) {
//       userType = 'instructor';
//     }

//     const token = 'your-auth-token';

//     // Return user, userType, and token in the response
//     res.status(200).json({ token, user, userType });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };