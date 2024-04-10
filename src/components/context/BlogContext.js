import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const BlogContext = createContext();

// Create a provider component
export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <BlogContext.Provider value={[posts, setPosts]}>
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
