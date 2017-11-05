const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const express = require("express");
const app = express();

const adminController = {};

adminController.login = (req, res) => {

};

adminController.getStudents = (req, res) => {
    console.dir(res);
    res.send("GET all the students here");
};

adminController.login = (req, res) => {
  //fake a user
  const user = {id: 12, username: "opiumated"};
  const token = jwt.sign({user}, config.jwt.secretKey);
  res.json({
      token: token
  });
};

adminController.protected = (req, res) => {
    res.json({
        message: "Protected Route"
    });
};

module.exports = adminController;
