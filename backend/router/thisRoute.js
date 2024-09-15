const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const loginModel = require("../models/loginModel");
const postModel = require("../models/postModel");

//###################login details API START #################################

//###################login details API START #################################
async function isUserExist(email) {
    const response = await loginModel.findOne({ email: email });
    return response ? true : false;
}

const getSingleAuthDetails = async (email) => {
    const response = await loginModel.findOne({ email: email }); // Assuming 'loginModel' is the correct model
    return response;
};

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const isUser = await isUserExist(email);
        if (isUser) {
            // Check if user email and password match
            const authData = await getSingleAuthDetails(email);
            let isMatched = authData && authData.email === email && authData.password === password;
            if (isMatched) {
                res.status(200).json({ message: "User login successful" });
            } else {
                res.status(401).json({message:"password does not match!"});
            }
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/signup", async (req, res) => {
	// console.log("req body", req.body);
	
    const { name, number, email, password } = req.body;

    
    try {
        let isUser = await isUserExist(email);
        if (isUser) {
            console.log("User exists");
            res.status(409).json({message:"User already exists"});
        } else {
            const newUser = new loginModel({
                name: name,
                number: number,
                email: email,
                password: password,
            });
            await newUser.save();
            console.log("Signup data saved");
            res.status(200).json({ message: "User signup data saved!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

//###################login details API END #################################

//################### blogs API START ######################################

//save blogs to database
router.post("/create", async (req, res) => {
	const { authorName, heading, paragraph, list, imageUrl } = req.body;
	
	try {
		const saveBlogsData = new postModel({
			authorName: authorName,
			heading: heading,
			paragraph: paragraph,
			list: list,
			imageUrl: imageUrl.trim(),
		});
		await saveBlogsData.save();
		console.log("blogs data save successfully");
		res.status(200).json({ message: "blogs data saved!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log(error);
	}
});

//show all blogs data
router.get("/blogs", async (req, res) => {
	try {
		const blogsData = await postModel.find({});
		res.status(200).json(blogsData);
		// console.log(blogsData);
	} catch (error) {
		res.status(300).json({ error: error.message });
		console.log(error);
	}
});


//show all bogs details at admin pannel call
router.get("/allblogsdetails", async (req, res) => {
	try {
		const blogsData = await postModel.find({});
		res.status(200).json(blogsData);
		// console.log(blogsData);
	} catch (error) {
		res.status(300).json({ error: error.message });
		console.log(error);
	}
});

//show single data
router.get("/blogs/details/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const singleBlogs = await postModel.findById({ _id: id });
		res.status(200).json(singleBlogs);
		// console.log(singleBlogs);
	} catch (error) {
		res.status(300).json({ error: error.message });
		console.log(error);
	}
});

//delete single blogs
router.delete("/blogs/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await postModel.findByIdAndDelete({ _id: id });
		res.status(200).json({message:`this user is deleted! ${deletedUser}`});
		// console.log(deletedUser);
	} catch (error) {
		res.status(300).json({ error: error.message });
		console.log(error);
	}
});

//update data
router.patch("/blogs/:id", async (req, res) => {
	const { id } = req.params;
	const { authorName, heading, paragraph, list, imageUrl } = req.body;
	try {
		const updatedBlogsData = await postModel.findByIdAndUpdate(
			{ _id: id },
			{
				authorName: authorName,
				heading: heading,
				paragraph: paragraph,
				list: list,
				imageUrl: imageUrl,
			},
			{ new: true }
		);
		if (!updatedBlogsData) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({message:"updated successfully!"});
		// console.log(updatedBlogsData);
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log(error);
	}
});

//################### blogs API END ######################################

module.exports = router;
