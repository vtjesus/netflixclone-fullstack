const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })

        const user = await newUser.save()

        res.status(201).send(user)
    }
    catch (err) {
        res.send(err)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        !user &&
            res.send("No user found with the provided email");

        let decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        let originalPassword = decrypted.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.send("Wrong password");

            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "1d"});

        const { password, ...info } = user._doc;

        res.send({...info, accessToken})
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports = {
    register,
    login,
}