import React from "react";
import tw from "twin.macro";
import { useBlog } from "../components/context/BlogContext.js";
import Header from "../components/headers/light.js";

const PageContainer = tw.div`p-4 md:p-8`;
const Title = tw.h1`text-xl text-center md:text-6xl mt-8 font-bold mb-4`;
const Category = tw.p`text-xs  md:text-sm text-gray-500 mb-2`;
const Date = tw.p`text-xs text-center  md:text-sm text-gray-500 mb-2`;
const ContentContainer = tw.div`prose prose-sm md:prose-lg lg:prose-xl mx-auto`;

function BlogPage() {
  const { blogState } = useBlog();
  console.log("BlogPage is being rendered");
  console.log("currentPost", blogState.currentPost);
  console.log("blogPosts", blogState.blogPosts);

  const post = blogState.blogPosts?.find(
    (post) => post.id === Number(blogState.currentPost)
  );

  if (!post) return <PageContainer>No post found.</PageContainer>;

  return (
    <PageContainer>
      <Header />
      <Title>{post.title}</Title>
      <Date>{post.modified}</Date>
      <Category>{post.category}</Category>
      <ContentContainer
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></ContentContainer>
    </PageContainer>
  );
}

export default BlogPage;
