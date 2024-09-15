import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const apiUrl = import.meta.env.VITE_API_URL;

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [authorName, setAuthorName] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [list, setList] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const getSingleBlogsData = async (getUrl) => {
    try {
      const response = await fetch(getUrl, {
        method: "GET",
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
      } else {
        setAuthorName(result.authorName);
        setHeading(result.heading);
        setParagraph(result.paragraph);
        setList(result.list);
        setImageUrl(result.imageUrl);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch blog data");
    }
  };

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();
    const blogsUpdatedData = {
      authorName,
      heading,
      paragraph,
      list,
      imageUrl,
    };
    try {
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: "PATCH",
        body: JSON.stringify(blogsUpdatedData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update blog");
      } else {
        setError("");
        navigate("/api");  
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getSingleBlogsData(`${apiUrl}/blogs/details/${id}`);
  }, [id]);

  return (
    <div className="">
      <div className="flex rounded-lg justify-center px-10">
        <form
          className="bg-[#212121] p-5 flex flex-col text-white rounded-md"
          onSubmit={handleFormEditSubmit}
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
          
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="bg-blue-500 py-1.5 rounded-md text-white hover:bg-green-500"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
	  <Footer></Footer>
    </div>
  );
}

export default EditPost;
