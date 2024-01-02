const User = require("../models/user")
const bcryptjs = require('bcryptjs');


const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const user = await User.create({ username, email, password: hashedPassword })
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

module.exports = signup