import { useReducer, useEffect, createContext } from "react";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user") || null),
	error: false,
};
const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return { user: action.payload, error: false };
		case "LOGIN_FAILED":
			return { user: null, error: action.payload };
		default:
			return state;
	}
};

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<UserContext.Provider
			value={{ user: state.user, error: state.error, dispatch }}
		>
			{children}
		</UserContext.Provider>
	);
};
