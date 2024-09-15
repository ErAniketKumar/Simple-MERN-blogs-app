import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import AllBlogsDetails from "./pages/AllBlogsDetails";
import GreetPage from "./pages/GreetPage";



function App() {
	return (
		<>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<GreetPage />}></Route>
				<Route path="/api" element={<Home />}></Route>
				<Route path="/api/login" element={<Login />}></Route>
				<Route path="/api/signup" element={<Signup />}></Route>
				<Route path="/api/create" element={<CreatePost />}></Route>
				<Route path="/api/blogs/:id" element={<EditPost />}></Route>
				<Route path="/api/blogs/details/:id" element={<PostDetails />}></Route>				
				<Route path="/api/allblogsdetails" element={<Login />}></Route>				
			</Routes>
		</>
	);
}

export default App;
