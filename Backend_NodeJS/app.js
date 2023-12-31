var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/usersRoute");
const cartRouter = require("./routes/cartRoute");
const productRouter = require("./routes/productRoute");

var app = express();

const connectDB = async () => {
	try {
		const db = await mongoose.connect(
			"mongodb+srv://dhangareumesh:spm7C5NoaQvWsI3H@cluster0.gcqykth.mongodb.net/"
		);
		console.log("Connected to db succesfully");
	} catch (e) {
		console.log(e.message);
	}
};
connectDB();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
