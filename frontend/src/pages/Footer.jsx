import React from "react";

function Footer() {
  
	return (
		<footer className="bg-gray-900 text-white py-4 mt-2">
			<div className="flex flex-col items-center gap-2">
				<div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold">About Us</h1>
					<p>
						We are committed to providing the best services. Our goal is to
						enhance user experience with innovative solutions.
					</p>
				</div>

				<p>&copy; {new Date().getFullYear()} Aniket All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
