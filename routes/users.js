var express = require('express');
var router = express.Router();
const { addUser, findUserByUsername, findUserByEamil } = require("../controller/to-do-list");
const { comparePass, encryptedPass } = require("../controller/password");
const Validator = require("fastest-validator");
const { check, validationResult } = require("express-validator");
const v = new Validator();

// sign-up form
router.post('/sign-up', [
  check("email", "Please fill email properly").isEmail()
], async (req, res) => {
  const schema = {
    username: "string",
    email: "string",
    password: "string"
  }

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      message: "Fill these form properly",
      validate
    })
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // isRegisteredUsername
  const isRegistererd = await findUserByUsername(username);
  if (isRegistererd) {
    return res.json({
      message: "Username already registered",
      status: "registered"
    })
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const resultErr = errors.array();
    return res.json({
      message: "failed",
      resultErr
    })
  }

  const hashPass = await encryptedPass(password);

  const data = { username, email, password: hashPass }
  const response = await addUser(data);

  res.json({ message: "success", response });
});

// login form 
router.post("/login", [
  check("email", "Please fill email properly").isEmail()
], async (req, res) => {
  const schema = {
    email: "string",
    password: "string"
  }

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      message: "Fill these form properly",
      status: "failed form",
      validate
    })
  }

  // Cek email 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const resultErr = errors.array();
    return res.json({
      status: "failed email",
      resultErr
    })
  }

  const email = req.body.email;
  const password = req.body.password;

  // cek apakah email sudah terdaftar
  const isRegistered = await findUserByEamil(email);
  if (!isRegistered) {
    return res.json({
      status: "failed user",
      message: "Unregistered email"
    })
  }

  const hashPass = isRegistered.password;

  // cek apakah passwordnya sama 
  const isPassword = await comparePass(password, hashPass);
  if (!isPassword) {
    return res.json({ status: "failed password", message: "Incorrect password" })
  }

  res.json({ message: "Success login", user: isRegistered })
})

module.exports = router;
