var express = require("express");
var productRouter = express.Router();
const Product = require("../models/Product");

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const addProduct = async (req, res) => {
	try {
		const product = req.body;
		const newProduct = new Product(product);
		const savedProduct = await newProduct.save();
		res.status(200).send({
			status: "success",
			message: "Product added successfully",
		});
	} catch (err) {
		res.status(400).send({
			status: "failure",
			message: "Failed to add product",
		});
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		res.json(product);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", addProduct);

module.exports = productRouter;
