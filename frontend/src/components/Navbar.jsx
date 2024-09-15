import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div className="">
			<div className="flex justify-between shadow-lg py-3 px-10 bg-white text-lg font-medium">
				{/* fixed top-0 right-0 left-0 */}
				<div className="md:w-1/2">
					<NavLink className="hover:text-indigo-500" to="/">Aniket</NavLink>
				</div>
				<div className="flex md:gap-4 gap-2">
					<NavLink className="hover:text-indigo-500" to="/api">Home</NavLink>
					<NavLink className="hover:text-indigo-500" to="/api/login">Login</NavLink>
					<NavLink className="hover:text-indigo-500" to="/api/signup">Signup</NavLink>
					<NavLink className="hover:text-indigo-500" to="/api/create">Create Blogs</NavLink>
					{/* <NavLink to="/api/blogs/:id">EditPost</NavLink> */}
					{/* <NavLink to="/api/blogs/details/:id">Post Details</NavLink> */}
					
				</div>
			</div>
		</div>
	);
}

export default Navbar;
