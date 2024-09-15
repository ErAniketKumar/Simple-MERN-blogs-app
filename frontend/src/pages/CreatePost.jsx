import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
function CreatePost() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [authorName, setAuthorName] = useState("");
	const [heading, setHeading] = useState("");
	const [paragraph, setParagraph] = useState("");
	const [list, setList] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const blogsData = {
			authorName,
			heading,
			paragraph,
			list,
			imageUrl,
		};
		const response = await fetch(`${apiUrl}/create`, {
			method: "POST",
			body: JSON.stringify(blogsData),
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
			setError("");
			setAuthorName("");
			setHeading("");
			setParagraph("");
			setList("");
			setImageUrl("");
			navigate("/api");
		}
	};

	return (
		<div className="">
			{error && (
				<div
					className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-white"
					role="alert"
				>
					<span className="font-medium">Info alert!</span> {error}
				</div>
			)}
			<div className="px-10 flex rounded-lg justify-center">
				<form
					className="bg-[#212121] p-5 flex flex-col text-white rounded-md"
					action={`${apiUrl}/create`}
					method="POST"
					onSubmit={handleFormSubmit}
				>
					<label htmlFor="authorName">Author Name </label>
					<input
						className="outline-none text-white bg-[#2f2f2f] py-1.5"
						type="text"
						name="authorName"
						id="authorName"
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
					/>

					<label htmlFor="heading">Title </label>
					<input
						className="outline-none text-white bg-[#2f2f2f] py-1.5"
						type="text"
						name="heading"
						id="heading"
						value={heading}
						onChange={(e) => setHeading(e.target.value)}
					/>

					<label htmlFor="paragraph">Paragraph </label>
					<textarea
						className="outline-none text-white bg-[#2f2f2f] py-1.5"
						rows="5"
						cols="100"
						name="paragraph"
						id="paragraph"
						value={paragraph}
						onChange={(e) => setParagraph(e.target.value)}
					></textarea>

					<label htmlFor="list">List-tag </label>
					<input
						className="outline-none text-white bg-[#2f2f2f] py-1.5"
						type="text"
						name="list"
						id="list"
						value={list}
						onChange={(e) => setList(e.target.value)}
					/>

					<label htmlFor="imageUrl">Image-url </label>
					<input
						className="outline-none text-white bg-[#2f2f2f] py-1.5"
						type="text"
						name="imageUrl"
						id="imageUrl"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
					<button
						className="bg-blue-500 py-1.5 rounded-md text-white hover:bg-green-500"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default CreatePost;
