require("dotenv").config()
const mongoose = require("mongoose");

require("../config/mongodb");

const { DB_COLLECTION } = process.env;

const User = mongoose.model(DB_COLLECTION, {
    username: String,
    email: String,
    password: String,
    taskList: []
})

module.exports = User;