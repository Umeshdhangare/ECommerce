// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/LoginComponent";
import SignUp from "./components/SignupComponent";
import Product from "./components/ProductComponent";
import NavbarComponent from "./components/NavbarComponent";
import Cart from "./components/CartComponent";

function App() {
	return (
		<>
			<BrowserRouter>
				<NavbarComponent />
				<Routes>
					<Route path="/" element={<Product />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/product" element={<Product />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
