import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AllBlogsDetails from "./AllBlogsDetails";

function Login() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	// This will track whether the user is logged in or not
	const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginData = {
			email,
			password,
		};
		const response = await fetch(`${apiUrl}/login`, {
			method: "POST",
			body: JSON.stringify(loginData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (!response.ok) {
			setError(result.message);
			console.log(result.message);
		}

		if (response.ok) {
			if (result.message === "User login successful") {
				setError("");
				setIsLoggedIn(true); 
				navigate("/api/allblogsdetails"); 
			} else {
				console.log("Password does not match!");
			}
		}
	};

	// Conditionally render the AllBlogsDetails component if the user is logged in
	if (!isLoggedIn) {
		return (
			<div className="login-wrapper">
				{error && (
					<div
						className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-white"
						role="alert"
					>
						<span className="font-medium">Info alert!</span> {error}
					</div>
				)}
				<div className="flex justify-center px-10">
					<div className="flex bg-gray-500 p-5 mt-5 text-white rounded-lg">
						<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
							<div className="flex justify-center">
								<img
									className="w-[6rem] h-[6rem] rounded-full"
									src="../images/loginImg.jpeg"
									alt=""
								/>
							</div>
							<input
								className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
								type="text"
								name="email"
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
								type="password" // Use password type
								name="password"
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className="bg-blue-500 py-2 rounded-md text-white hover:bg-green-500"
								type="submit"
							>
								Login
							</button>
						</form>
					</div>
				</div>
				<Footer />
			</div>
		);
	} else {
		
		return <AllBlogsDetails />;
	}
}

export default Login;
