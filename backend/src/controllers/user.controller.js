const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const {generateUserJWT} = require('../middlewares/generateJWT.js');

async function userSignup(req, res) {
    const { userName, userEmail, userPassword } = req.body;
    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            msg: "Fill all the credentials"
        });
    }

    try {
        const existingUser = await User.findOne({userEmail: userEmail});
        if (existingUser) {
            return res.status(400).json({
                msg: "User with this email already exists"
            });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = await User.create({
            userName,
            userEmail,
            userPassword: hashPassword,
        });

   
        const userToken = generateUserJWT(newUser);

        return res.status(201).json({
            msg: "User registered successfully",
            userName,
            userEmail,
            userToken
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}

async function userLogin(req, res) {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(400).json({
            msg: "Fill all the credentials"
        });
    }

    try {
        const user = await User.findOne({ userEmail: userEmail });
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: "Invalid credentials"
            });
        }

        const userToken = generateUserJWT(user);

        return res.status(200).json({
            msg: "Login successful",
            userName: user.userName,
            userEmail: user.userEmail,
            userToken
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = {
    userSignup,
    userLogin
};
