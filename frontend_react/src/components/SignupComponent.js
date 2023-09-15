import axios from "axios";
import { API_URI } from "../config";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupComponent.css";
const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const navigateTo = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const data = { username, password, name };
			const res = await axios.post(`${API_URI}/users/signup`, data);
			console.log(res);
			navigateTo("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="signupscreen">
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
							<p>Signup</p>
						</div>

						<input
							type="text"
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							type="email"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>

						<input
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Link to="/login" className="link">
							<span>Already have an account ?</span>
						</Link>
						<br />

						<input type="submit" value="Sign up" onClick={handleSignUp} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
