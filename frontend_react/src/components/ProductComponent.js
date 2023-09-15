import { useEffect, useState, useContext } from "react";
import { API_URI } from "../config";
import axios from "axios";
import { UserContext } from "../contexts/UserConetxt";
import "./ProductComponent.css";

const Product = () => {
	const [productList, setProductList] = useState([]);
	const { user } = useContext(UserContext);

	const handleAddToCart = async (product) => {
		try {
			await axios.post(
				`${API_URI}/cart`,
				{ productId: product._id },
				{
					headers: { Authorization: user.token },
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(`${API_URI}/products`);
				setProductList([...res.data]);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, []);

	return (
		<>
			{productList.map((p) => (
				<div className="product">
					<img src={p.imgUrl} alt={p.name} />

					<div className="product__info">
						<p className="info__name">{p.name}</p>

						<p className="info__price">${p.price}</p>
					</div>
					<div>
						<button onClick={(p) => handleAddToCart(p)}>ADD TO CART </button>
					</div>
				</div>
			))}
		</>
	);
};

export default Product;
