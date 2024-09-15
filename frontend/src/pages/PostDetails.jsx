import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function PostDetails() {
	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [singleBlogData, setSingleBlogData] = useState("");
	const [paragraphs, setParagraphs] = useState([]);
	const [lists, setLists] = useState([]);
	const [headings, setHeadings] = useState([]);
	const [images, setImages] = useState([]);
	const [loader, setLoader] = useState(true);

	const { id } = useParams();

	const fetchSingleDataFromDb = async (getUrl) => {
		try {
			const response = await fetch(getUrl, {
				method: "GET",
			});

			if (!response.ok) {
				console.log("error to fetch data");
			}
			const result = await response.json();
			setSingleBlogData(result);
			setLoader(false);
			// extractData();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (singleBlogData) {
			let paragraphData = singleBlogData.paragraph;
			let listsData = singleBlogData.list;
			let headingsData = singleBlogData.heading;
			let imagesData = singleBlogData.imageUrl;

			setParagraphs(paragraphData.split("#"));
			setHeadings(headingsData.split("#"));
			setLists(listsData.split("#"));
			setImages(imagesData.split("##"));
		}
	}, [singleBlogData]);

	useEffect(() => {
		fetchSingleDataFromDb(`${apiUrl}/blogs/details/${id}`);
	}, []);

	return (
		<div className="px-10">
			{loader && <div className="text-2xl font-semibold">Loading...</div>}
			{singleBlogData && (
				<>
					<div className="flex flex-col gap-2 px-10 py-2">
						<h1 className="text-xl font-semibold underline underline-offset-2 ">
							{singleBlogData.authorName}
						</h1>
						<p className="">
							<span className="font-semibold">Created On:</span>{" "}
							{new Date(singleBlogData.createdAt).toLocaleDateString("en-GB")}{" "}
							<span className="text-gray-500">
								|{" "}
								{new Date(singleBlogData.createdAt).toLocaleTimeString(
									"en-GB",
									{ hour: "2-digit", minute: "2-digit", hour12: true }
								)}
							</span>
						</p>
						<p className="mb-5">
							<span className="font-semibold">Recent Update On:</span>{" "}
							{new Date(singleBlogData.updatedAt).toLocaleDateString("en-GB")}{" "}
							<span className="text-gray-500">
								|{" "}
								{new Date(singleBlogData.updatedAt).toLocaleTimeString(
									"en-GB",
									{ hour: "2-digit", minute: "2-digit", hour12: true }
								)}
							</span>
						</p>
					</div>
					<div className="grid md:grid-cols-2 grid-cols-1 gap-20">
						<div>
							{images.length > 1 ? (
								images.map((image, index) => (
									<img
										key={index}
										src={image}
										className="w-full md:h-[25rem]"
										alt=""
									/>
								))
							) : (
								<img
									src={singleBlogData.imageUrl}
									className="w-full md:h-[25rem]"
									alt=""
								/>
							)}
						</div>
						<div className="flex flex-col gap-4">
							{/* For multiple headings  and show only even posotions heading*/}
							{headings.length > 1 ? (
								headings.map((heading, index) =>
									index % 2 === 0 ? (
										<h1 key={index} className="text-4xl font-bold">
											{heading}
										</h1>
									) : null
								)
							) : (
								<h1 className="text-4xl font-bold">{singleBlogData.heading}</h1>
							)}

							{/* for multiple paragraph */}

							{paragraphs.length > 1 ? (
								paragraphs.map((para, index) =>
									index % 2 === 0 ? <p key={index}>{para}</p> : null
								)
							) : (
								<p>{singleBlogData.paragraph}</p>
							)}

							<ul className="text-green-800 font-medium text-xl underline">
								{lists.length > 1 ? (
									lists.map((list, index) => <li key={index}>{list}</li>)
								) : (
									<li>{singleBlogData.lists}</li>
								)}
							</ul>

							{/* second times heading */}
							{headings.length > 1
								? headings.map((heading, index) =>
										index % 2 !== 0 ? (
											<h1 key={index} className="text-4xl font-bold">
												{heading}
											</h1>
										) : null
								  )
								: null}

							{/* second time paragraph */}
							{paragraphs.length > 1
								? paragraphs.map((para, index) =>
										index % 2 !== 0 ? <p key={index}>{para}</p> : null
								  )
								: null}

							<span>
								<button
									onClick={(e) => navigate("/api")}
									className="bg-yellow-500 hover:bg-green-500 text-white rounded-md py-2 px-4 mb-2"
								>
									Back to Home
								</button>
							</span>
						</div>
					</div>
				</>
			)}
			<Footer></Footer>
		</div>
	);
}

export default PostDetails;
