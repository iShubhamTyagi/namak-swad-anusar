import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { useBlog } from "../components/context/BlogContext.js";
import Header from "../components/headers/light.js";
import useFetchBlogs from "./FetchBlogs";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const PageContainer = tw.div`p-4 md:p-8`;
const Title = tw.h1`text-xl text-center md:text-6xl mt-8 font-bold mb-4`;
const Category = tw.p`text-xs md:text-sm text-gray-500 mb-2`;
const Date = tw.p`text-xs text-center md:text-sm text-gray-500 mb-2`;
const ContentContainer = tw.div`prose prose-sm md:prose-lg lg:prose-xl mx-auto`;

function BlogPage() {
  const [currentPost, setCurrentPost] = useState({});
  const [currentPostId, setCurrentPostId] = useState(null);
  let [loading, setLoading] = useState(true);

  const { blogState } = useBlog();
  let { id } = useParams();

  useFetchBlogs();

  useEffect(() => {
    setCurrentPostId(id);
    window.scrollTo(0, 0);
  }, [id]);

  // const getPostIdFromLocalStorage = () => {
  //   const postId = localStorage.getItem("currentPostId");
  //   return JSON.parse(postId);
  // };

  const getTimeStampFromLocalStorage = () => {
    const data = localStorage.getItem("blogPosts");
    const blogPosts = JSON.parse(data);
    if (blogPosts) {
      return blogPosts.timestamp;
    }
    return null;
  };

  const getBlogPostsFromLocalStorage = () => {
    const data = localStorage.getItem("blogPosts");
    if (data) {
      return JSON.parse(data).value;
    }
    return null;
  };

  useEffect(() => {
    const timeStamp = getTimeStampFromLocalStorage();
    const currentTime = new window.Date().getTime();
    const fiveSeconds = 10 * 1000; // 5 seconds in milliseconds

    if (timeStamp || currentTime - timeStamp > fiveSeconds) {
      try {
        let post = blogState.blogPosts.find(
          (post) => post.id === Number(currentPostId)
        );

        if (currentPost !== post) {
          setCurrentPost(post);
          setLoading(false);
        }
      } catch (error) {
        console.error("Invalid JSON string:", blogState.blogPosts);
      }
    } else {
      const allBlogs = getBlogPostsFromLocalStorage();
      let post = JSON.parse(allBlogs).find(
        (post) => post.id === Number(currentPostId)
      );
      setCurrentPost(post);
      setLoading(false);
    }
  }, [blogState.blogPosts, currentPostId, currentPost]);

  // useEffect(() => {
  //   if (currentPost) setLoading(false);
  // }, [currentPost]);

  if (loading)
    return (
      <RingLoader
        color={"#000000"}
        loading={loading}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  if (!currentPost) return <PageContainer>No post found.</PageContainer>;

  return (
    <div>
      <PageContainer>
        <Header />
        <Title>{currentPost.title}</Title>
        <Date>{currentPost.modified}</Date>
        <Category>{currentPost.category}</Category>
        <ContentContainer
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        ></ContentContainer>
      </PageContainer>
    </div>
  );
}

export default BlogPage;
