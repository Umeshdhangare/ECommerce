const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
	return jwt.sign({ id: user._id }, "123-456-789", {
		expiresIn: "1d",
	});
};

module.exports = {
	newToken,
};
