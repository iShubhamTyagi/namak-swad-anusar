import React from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import { useBlog } from "../components/context/BlogContext.js";

const PageContainer = tw.div`p-8`;
const Title = tw.h1`text-2xl font-bold mb-4`;
const Image = tw.img`w-full h-auto mb-4`;
const Category = tw.p`text-sm text-gray-500 mb-2`;
const Date = tw.p`text-sm text-gray-500 mb-2`;
const Excerpt = tw.p`text-base text-gray-700`;

function BlogPage({ posts }) {
  const { currentPost } = useBlog();
  console.log(currentPost);

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  return (
    <PageContainer>
      <Title>{currentPost.title}</Title>
      <Image src={currentPost.thumbnailUrl} alt={currentPost.title} />
      <Category>{currentPost.category}</Category>
      <Date>{currentPost.modified}</Date>
      <Excerpt>{currentPost.excerpt}</Excerpt>
    </PageContainer>
  );
}

export default BlogPage;
