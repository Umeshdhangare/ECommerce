import "./LoginComponent.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { API_URI } from "../config";
import { UserContext } from "../contexts/UserConetxt";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
	const naviagate = useNavigate();
	const username = useRef();
	const password = useRef();
	const { dispatch } = useContext(UserContext);
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URI}/users/login`, {
				username: username.current.value,
				password: password.current.value,
			});
			const { status, message, ...other } = res.data;
			dispatch({ type: "LOGIN_SUCCESS", payload: other });
			naviagate("/product");
		} catch (err) {
			console.log(err);
			dispatch({ type: "LOGIN_FAILURE", payload: err });
		}
	};

	return (
		<>
			<div className="signinscreen">
				<div className="container">
					<div className="innerContainer">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "20px",
								// backgroundColor: 'red',
							}}
						>
							<p>Sign In</p>
						</div>

						<input type="email" placeholder="Username" ref={username} />

						<input type="password" placeholder="Password" ref={password} />

						<Link to="/signup" className="link">
							<span>Creat a new account ?</span>
						</Link>
						<br />

						<input type="submit" value="Sign in" onClick={handleLogin} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
