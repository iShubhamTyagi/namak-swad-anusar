import React, { createContext, useContext, useState, useEffect } from "react";

// Creating separate contexts for reading and updating state
export const BlogContext = createContext();
export const BlogUpdateContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    console.log("Blog posts updated", blogPosts);
    console.log("Current post updated", currentPost);
  }, [blogPosts, currentPost]);

  return (
    <BlogContext.Provider value={{ blogPosts, currentPost }}>
      <BlogUpdateContext.Provider value={{ setBlogPosts, setCurrentPost }}>
        {children}
      </BlogUpdateContext.Provider>
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);

export const useBlogUpdate = () => useContext(BlogUpdateContext);
