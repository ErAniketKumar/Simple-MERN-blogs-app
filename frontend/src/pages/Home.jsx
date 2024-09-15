import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [blogsData, setBlogsData] = useState("");
	const [loader, setLoader] = useState(true);
	async function fetchBlogsDataFromDb(getUrl) {
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
			console.log(error);
		}
	}

	useEffect(() => {
		fetchBlogsDataFromDb(`${apiUrl}/blogs`);
	}, []);
	return (
		<div>
			{loader && <div className="text-2xl font-semibold">Loading...</div>}
			<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-10 py-5">
				{blogsData && blogsData.length > 0
					? blogsData.map((blog) => (
							<div
								key={blog._id}
								className="flex flex-col items-center gap-3 bg-white shadow-lg p-2"
							>
								<img
									src={blog.imageUrl}
									alt="Blog Image"
									className="w-full md:h-[20rem] sm:h-[16rem] h-[20rem] object-cover"
								/>
								<h1 className="md:text-2xl sm:text-2xl text-3xl font-semibold underline">
									{blog.heading.split("#")[0]}
								</h1>
								<p>{blog.paragraph.split("#")[0]}</p>
								<Link to={`/api/blogs/details/${blog._id}`}>
									<button className="bg-blue-500 hover:bg-green-500 text-white rounded-md px-2 py-2 flex">
										Read More
									</button>
								</Link>
							</div>
					  ))
					: null}
			</div>
			<Footer></Footer>
		</div>
	);
}

export default Home;
