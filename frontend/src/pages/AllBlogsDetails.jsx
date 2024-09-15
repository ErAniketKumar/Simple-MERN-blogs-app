import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function AllBlogsDetails() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [blogsData, setBlogsData] = useState("");
	const [error, setError] = useState(null);
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();

	const fetchBlogsFromDb = async (getUrl) => {
		try {
			const response = await fetch(getUrl, {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setBlogsData(result);
			setLoader(false);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`${apiUrl}/blogs/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			navigate("/api");
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchBlogsFromDb(`${apiUrl}/allblogsdetails`);
	}, []);

	return (
		<div>
			{loader && <div className="text-2xl font-semibold">Loading...</div>}
			{error && (
				<div
					className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-white"
					role="alert"
				>
					<span className="font-medium">Info alert!</span> {error}
				</div>
			)}

			<h1 className="flex justify-center text-2xl font-medium text-indigo-600 bg-yellow-400">
				Welcome To Admin Page
			</h1>

			<div className="px-10 flex justify-center">
				<table className="table-auto border-collapse border border-gray-400">
					<thead>
						<tr>
							<th className="border border-gray-400 px-4 py-2">ID</th>
							<th className="border border-gray-400 px-4 py-2">TITLE</th>
							<th className="border border-gray-400 px-4 py-2">ACTION</th>
						</tr>
					</thead>
					<tbody>
						{blogsData && blogsData.length > 0
							? blogsData.map((blogs) => (
									<tr key={blogs._id}>
										<td className="border border-gray-400 px-4 py-2">
											{blogs._id}
										</td>
										<td className="border border-gray-400 px-4 py-2">
											{blogs.heading}
										</td>
										<td className="border border-gray-400 px-4 py-2 flex gap-3">
											<CiTrash
												onClick={() => handleDelete(blogs._id)}
												className="text-2xl text-red-500 cursor-pointer"
											/>
											<Link to={`/api/blogs/${blogs._id}`}>
												<FaRegEdit className="text-2xl text-blue-700 cursor-pointer" />
											</Link>
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default AllBlogsDetails;
