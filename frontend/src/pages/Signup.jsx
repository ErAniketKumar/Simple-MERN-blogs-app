import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Signup() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const saveUserAuth = {
			name,
			number,
			email,
			password,
		};

		const response = await fetch(`${apiUrl}/signup`, {
			method: "POST",
			body: JSON.stringify(saveUserAuth),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (!response.ok) {
			setError(result.message);
			console.log(result.error);
		}
		if (response.ok) {
			setName("");
			setNumber("");
			setEmail("");
			setPassword("");
			setError("");
			navigate("/api/login");
		}
	};
	return (
		<div className="h-full">
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
					<form
						className="flex flex-col gap-2"
						action={`${apiUrl}/signup`}
						method="POST"
						onSubmit={handleSubmit}
					>
						<div className="flex justify-center">
							<img
								className="w-[6rem] h-[6rem] rounded-full"
								src="../images/signupImg.png"
								alt=""
							/>
						</div>
						<input
							className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
							type="text"
							name="name"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
							type="text"
							name="number"
							placeholder="number"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
						/>
						<input
							className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
							type="email"
							name="email"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className="outline-none bg-gray-300 rounded-md p-1 text-[#000]"
							type="password"
							name="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="bg-blue-500 py-2 rounded-md text-white hover:bg-green-500"
							type="submit"
						>
							Signup
						</button>
					</form>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default Signup;
