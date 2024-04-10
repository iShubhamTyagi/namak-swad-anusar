import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const BlogContext = createContext();

// Create a provider component
export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(0);

  useEffect(() => {
    console.log("This is posts -->" + posts);
    console.log("This is current posts -->" + currentPost);
  }, [posts, currentPost]);

  return (
    <BlogContext.Provider
      value={[posts, setPosts, currentPost, setCurrentPost]}
    >
      {children}
    </BlogContext.Provider>
  );
}

// Create a hook to use the blog context
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
