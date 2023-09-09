const bcrypt = require("bcrypt");
const saltRound = 15;

const encryptedPass = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(pass, salt)
        return hash
    } catch (error) {
        console.log(error);
    }
}

const comparePass = async (pass, hash) => {
    try {
        const match = await bcrypt.compare(pass, hash);
        return match;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { encryptedPass, comparePass };