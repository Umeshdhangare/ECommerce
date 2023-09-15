var express = require("express");
var cartRouter = express.Router();
const Cart = require("../models/cart");
const { verifyUser, sendResponseError } = require("../middleware/middleware");

const getCartProducts = async (req, res) => {
	try {
		const carts = await Cart.find({ userId: req.user._id }).populate(
			"productId"
		);
		res.status(200).send({ status: "ok", carts });
	} catch (err) {
		console.log(err);
		sendResponseError(500, `Error ${err}`, res);
	}
};

const addProductInCart = async (req, res) => {
	const { productId } = req.body;
	console.log(productId);
	try {
		const cart = await Cart.findOneAndUpdate(
			{ productId },
			{ productId, userId: req.user._id },
			{ upsert: true }
		);
		console.log(cart);
		res.status(200).send({ status: "ok", cart });
	} catch (err) {
		console.log(err);
		sendResponseError(500, `Error ${err}`, res);
	}
};
const deleteProductInCart = async (req, res) => {
	try {
		await Cart.findByIdAndRemove(req.params.id);
		res.status(200).send({ status: "ok" });
	} catch (e) {
		console.log(err);
		sendResponseError(500, `Error ${err}`, res);
	}
};

cartRouter
	.route("/")
	.get(verifyUser, getCartProducts)
	.post(verifyUser, addProductInCart);

cartRouter.route("/:id").delete([verifyUser], deleteProductInCart);

module.exports = cartRouter;
