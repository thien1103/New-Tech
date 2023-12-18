// auth.controller.js
const Student = require('../models/student.model');
const Manager = require('../models/manager.model');
const Instructor = require('../models/instructor.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try to find a student by email
    let user = await Student.findOne({ email });

    // If not found, try to find a manager by email
    if (!user) {
      user = await Manager.findOne({ email });
    }

    // If not found, try to find an instructor by email
    if (!user) {
      user = await Instructor.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentication successful
    let userType;
    if (user instanceof Manager) {
      userType = 'manager';
    } else if (user instanceof Student) {
      userType = 'student';
    } else if (user instanceof Instructor) {
      userType = 'instructor';
    }

    const token = 'your-auth-token';

    // Return user, userType, and token in the response
    res.status(200).json({ token, user, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};