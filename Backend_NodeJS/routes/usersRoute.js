var express = require("express");
var userRouter = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { newToken } = require("../utils");

/* GET users listing. */

const userSignUp = async (req, res) => {
	try {
		const data = req.body;
		const { password } = data;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			...data,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
		res.status(200).send({
			status: "success",
			message: "User added successfully",
			data: { user: username },
		});
	} catch (e) {
		res.status(500).send({
			status: "failure",
			message: e.message,
		});
	}
};

const userLogin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username: username });
		if (!user) {
			return res.status(401).send({
				status: "failure",
				message: "user does not exist",
			});
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).send({
				status: "failure",
				message: "password is incorrect",
			});
		}

		const jwtToken = newToken(user);
		await User.findByIdAndUpdate(user._id, {
			token: jwtToken,
		});
		const { token, password: newPass, ...data } = user._doc;
		res.status(200).send({
			status: "sucsess",
			message: "logged in successfully",
			data: data,
			token: jwtToken,
		});
	} catch (e) {
		res.status(500).send({
			status: "failure",
			message: e.message,
		});
	}
};

const userLogout = async (req, res) => {
	try {
		const { token } = req.body;
		if (token) {
			await User.findOne({ token }, [{ $unset: ["token"] }]);
			res.status(200).send({
				status: "success",
				message: "You've been logged out",
			});
		} else {
			return res.status(400).send({
				status: "failure",
				message: "logout error",
			});
		}
	} catch (e) {
		res.status(500).send({
			status: "failure",
			message: e.message,
		});
	}
};

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);

module.exports = userRouter;
