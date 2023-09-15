const User = require("../models/users");
const jwt = require("jsonwebtoken");

const sendResponseError = (statusCode, msg, res) => {
	res.status(statusCode || 400).send(msg ? msg : "Invalid input !!");
};

const verifyUser = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		sendResponseError(400, "You are not authorized ", res);
		return;
	}
	try {
		// const token = authorization.split(" ")[1];
		const payload = jwt.verify(authorization, "123-456-789");

		if (payload) {
			const user = await User.findById(payload.id, { password: 0 });

			req["user"] = user;

			next();
		} else {
			console.log(res);
			sendResponseError(400, `you are not authorizeed`, res);
		}
	} catch (err) {
		console.log("Error ", err);
		sendResponseError(400, `Error ${err}`, res);
	}
};

module.exports = {
	sendResponseError,
	verifyUser,
};
