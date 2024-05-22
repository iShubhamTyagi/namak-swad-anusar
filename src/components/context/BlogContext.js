import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import isEqual from "lodash/isEqual";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogState, setBlogState] = useState({
    blogPosts: [],
    currentPost: null,
    recipeBlogs: [],
    techniqueBlogs: [],
    displayBlogs: [],
  });
  const prevBlogPostsRef = useRef();
  useEffect(() => {
    if (!isEqual(prevBlogPostsRef.current, blogState.blogPosts)) {
      console.log("Blog state updated", blogState);
    }
    prevBlogPostsRef.current = blogState.blogPosts;
  }, [blogState, blogState.blogPosts]);

  const setBlogPosts = (posts) =>
    setBlogState((prevState) => ({ ...prevState, blogPosts: posts }));
  const setCurrentPost = (post) =>
    setBlogState((prevState) => ({ ...prevState, currentPost: post }));
  const setRecipeBlogs = (post) =>
    setBlogState((prevState) => ({ ...prevState, recipeBlogs: post }));
  const setTechniqueBlogs = (post) =>
    setBlogState((prevState) => ({ ...prevState, techniqueBlogs: post }));
  const setDisplayBlogs = (post) =>
    setBlogState((prevState) => ({ ...prevState, displayBlogs: post }));

  return (
    <BlogContext.Provider
      value={{
        blogState,
        setBlogPosts,
        setCurrentPost,
        setRecipeBlogs,
        setTechniqueBlogs,
        setDisplayBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
