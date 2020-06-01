const express = require("express");
const models = require("../models");
// const upload = require("../multer.js");
const brypt = require("bcrypt");
const except = require("except");
const jwt = require("jsonwebtoken");

const routes = express.Router();

routes.post("/register", async (req, res) => {
  try {
    let error = [];
    const { username, password, email, phone } = req.body;
    if (!username || !password || !email || !phone) {
      error.push({ message: "please enter all fillds" });
    }
    if (password.length < 6) {
      error.push({ message: "password should be at least 6 charcter" });
    }
    if (error.length > 0) {
      res.send(error);
    } else {
      // hash password

      let hashingpass = brypt.hashSync(password, 10);

      //create user in table
      let createUser = await models.Users.create({
        username,
        password: hashingpass,
        email,
        phone,
      });
      console.log(createUser);

      res.json({ msg: createUser });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

routes.post("/login", async (req, res) => {
  try {
    let error = [];
    const { username, password } = req.body;
    let findUser = await models.Users.findOne({
      where: { username: username },
    });
    if (!findUser) {
      throw "username does not exist";
    }

    let validPass = brypt.compareSync(password, findUser.password);

    if (!validPass) {
      throw "password is wrong";
    }
    if (error.length > 0) {
      res.send(error);
    } else {
      const token = jwt.sign({ _username: findUser.username , _id : findUser.id }, "secret");
      res.header("auth-token", token).send(`logged in  ${token}`);
    }
  } catch (error) {
    return res.send(error);
  }
});

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
