const User = require("../models/User.js");
const CryptoJS = require("crypto-js");

// UPDATE

const updateUser = async (req, res) => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        };

        try {
            const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id}, { $set: req.body }, { new: true });

            res.status(200).send(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("You can update only your account")
    };
}

// DELETE

const deleteUser = async (req, res) => {
    if (req.params.id === req.user.id || req.user.isAdmin) {

        try {
            await User.findByIdAndDelete({ _id: req.params.id});
            res.status(200).send("User deleted");
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("You can delete only your account")
    };
}

// GET

const getUser = async (req, res) => {
    try {
        const findUser = await User.findById({ _id: req.params.id});
        if (!findUser) return res.status(404).send("User not found")
        const { password, ...info } = findUser._doc;
        res.status(200).send(info);
    } catch (err) {
        res.status(500).send(err);
    }
}

// GET USERS

const getAllUsers = async (req, res) => {
    const query = req.query.new

    if (req.user.isAdmin) {

        try {
            const users = query ? await User.find().sort({ _id:-1 }).limit(10) : await User.find()
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied")
    };
}

// GET USER STATS

const getUserStats = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(json)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUserStats,
    getAllUsers
}