require("dotenv").config()
const mongoose = require("mongoose");

const { linkMongo, DB_NAME} = process.env;

mongoose.connect(`${linkMongo}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})