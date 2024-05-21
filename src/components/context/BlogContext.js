import React, { createContext, useContext, useState, useEffect } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogState, setBlogState] = useState({
    blogPosts: [],
    currentPost: null,
  });

  useEffect(() => {
    console.log("Blog state updated", blogState);
  }, [blogState]);

  const setBlogPosts = (posts) =>
    setBlogState((prevState) => ({ ...prevState, blogPosts: posts }));
  const setCurrentPost = (post) =>
    setBlogState((prevState) => ({ ...prevState, currentPost: post }));

  return (
    <BlogContext.Provider value={{ blogState, setBlogPosts, setCurrentPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
