import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { API_URI } from "../config";
import { UserContext } from "../contexts/UserConetxt";
import "./CartComponent.css";

const Cart = () => {
	const [items, setItems] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		const getCartItems = async () => {
			const res = await axios.get(`${API_URI}/cart`, {
				headers: { Authorization: user.token },
			});
			const carts = res.data.carts;

			const tempArr = [];
			carts.map((p) => {
				tempArr.push(p["productId"]);
			});
			setItems([...tempArr]);
		};
		getCartItems();
	}, [items]);

	return (
		<>
			{items.map((item) => (
				<div key={item._id} className="cartitem">
					<div className="cartitem__image">
						<img src={item.imgUrl} alt={item.name} width="300" height="300" />
					</div>

					<p className="cartItem__name">{item.name}</p>
					<p className="cartitem__price">${item.price}</p>
					<button className="btn btn-primary">Buy Now</button>
				</div>
			))}
		</>
	);
};

export default Cart;
