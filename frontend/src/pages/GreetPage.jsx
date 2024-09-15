import React from "react";
import Footer from "./Footer";

function GreetPage() {
	return (
		<div>
			<div className="flex flex-col">
				<marquee
					className="text-2xl font-medium bg-indigo-500 text-white p-3"
					behavior=""
					direction=""
				>
					Welcome to Awesome Blogs Website!
				</marquee>
				<div className="flex flex-col items-center px-10 py-5">
					<h1 className="text-6xl p-5">Smile...😊😊</h1>
					<h1 className="text-3xl capitalize">
						Guest Can Create Blogs With Multiple Heading, Paragraph, And
						Multiple Image With List
					</h1>
				</div>
			</div>
            <Footer></Footer>
		</div>
	);
}

export default GreetPage;
