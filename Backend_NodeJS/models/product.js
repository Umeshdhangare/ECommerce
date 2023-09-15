const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
