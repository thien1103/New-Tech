const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

const Student = require("../models/student.model");

const Instructor = require("../models/instructor.model");
const Manager = require("../models/manager.model");


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};


isManager = (req,res,next) => {
    Manager.findById(req.userId).then(user => {
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "manager") {
              next();
              return;
            }
          }
    
          res.status(403).send({
            message: "Require Manager Role!"
          });
          return;
        });
      });
}

isInstructor = (req,res,next) => {
    Instructor.findById(req.userId).then(user => {
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "instructor") {
              next();
              return;
            }
          }
    
          res.status(403).send({
            message: "Require Instructor Role!"
          });
          return;
        });
      })
}

isHeadInstructor = (req,res,next) => {
    Instructor.findById(req.userId).then(
        user => {
            user.getRoles().then(roles => {
              for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "headInstructor") {
                  next();
                  return;
                }
              }
        
              res.status(403).send({
                message: "Require Head-Instructor Role!"
              });
              return;
            });
          }
    )
}

isStudent = (req,res,next) => {
    Student.findById(req.userId).then(user => {
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "student") {
              next();
              return;
            }
          }
    
          res.status(403).send({
            message: "Require Instructor Role!"
          });
          return;
        });
      }
    )
}

const authJwt = {
    verifyToken,
    isManager,
    isStudent,
    isInstructor,
    isHeadInstructor
};

module.exports = authJwt;


