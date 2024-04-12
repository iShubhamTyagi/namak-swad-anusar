import React from "react";
import tw from "twin.macro";
import { useBlog } from "../components/context/BlogContext.js";

const PageContainer = tw.div`p-4 md:p-8`;
const Title = tw.h1`text-xl md:text-3xl font-bold mb-4`;
const Category = tw.p`text-xs md:text-sm text-gray-500 mb-2`;
const Date = tw.p`text-xs md:text-sm text-gray-500 mb-2`;
const ContentContainer = tw.div`prose prose-sm md:prose-lg lg:prose-xl mx-auto`;

function BlogPage() {
  const { blogPosts, currentPost } = useBlog();
  console.log("BlogPage is being rendered");
  console.log("currentPost", currentPost);
  console.log("blogPosts", blogPosts);

  const post = blogPosts?.find((post) => post.id === currentPost);

  if (!post) return <PageContainer>No post found.</PageContainer>;

  return (
    <PageContainer>
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
