import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserConetxt";
import { API_URI } from "../config";
import axios from "axios";
import "./NavbarComponent.css";
const NavbarComponent = () => {
	const { user } = useContext(UserContext);

	const handleLogout = async () => {
		try {
			await axios.post(`${API_URI}/users/logout`, {
				token: user.token,
			});
			localStorage.setItem("user", null);
			window.location.reload(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<nav className="navbar">
				<ul className="navbar__links">
					<li>
						<Link to="/" className="cart__link">
							<span>Home</span>
						</Link>
					</li>

					{user ? (
						<li>
							<Link to="/cart" className="cart__link">
								<span>Cart</span>
							</Link>
						</li>
					) : (
						""
					)}

					<li>
						<Link to="/product" className="cart__link">
							<span>Product</span>
						</Link>
					</li>

					{!user ? (
						<li>
							<Link to="/login" className="cart__link">
								<span>Login</span>
							</Link>
						</li>
					) : (
						<li>
							<Link onClick={handleLogout}>
								<span>Logout</span>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};
export default NavbarComponent;
