import React, { useState, useEffect, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { Link } from "react-router-dom";
import {
  useBlog,
  useBlogUpdate,
} from "../../src/components/context/BlogContext";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`font-sans mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({}) => {
  const [visible, setVisible] = useState(7);

  const { setBlogPosts, setCurrentPost } = useBlogUpdate();
  const { blogPosts } = useBlog();

  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };

  const handlePostClick = (postId) => {
    setCurrentPost(postId);
    // navigate to the BlogPage
  };

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/myshelter00.wordpress.com/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const fetchedPosts = data.posts.map((post) => {
          let thumbnailUrl = "";
          if (post.attachments) {
            const firstAttachmentId = Object.keys(post.attachments)[0];
            const firstAttachment = post.attachments[firstAttachmentId];
            thumbnailUrl = firstAttachment.URL;
          }

          return {
            id: post.ID,
            title: post.title,
            url: post.URL,
            attachments: post.attachments,
            excerpt:
              post.excerpt.length > 100
                ? post.excerpt.substring(
                    3,
                    post.excerpt.lastIndexOf(" ", 100)
                  ) + "..."
                : post.excerpt,
            guid: post.guid,
            modified: new Date(post.modified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            shorturl: post.shorturl,
            tags: post.tags,
            content: post.content,
            thumbnailUrl: thumbnailUrl,
          };
        });
        setBlogPosts(fetchedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // useEffect(() => {
  //   if (blogPosts[0] && blogPosts[0].tags) {
  //     console.log("Blog Posts --> " + blogPosts);
  //   }
  // }, [blogPosts && blogPosts.length > 0]);

  return (
    <AnimationRevealPage disabled>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>Blog Posts</Heading>
          </HeadingRow>
          <Posts>
            {blogPosts &&
              blogPosts?.length > 0 &&
              blogPosts.slice(0, visible).map((post, index) => (
                <PostContainer key={index} featured={post.featured}>
                  <Post
                    className="group"
                    as={Link}
                    to={`/blog/${post.id}`}
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                  >
                    <Image imageSrc={post.thumbnailUrl} />
                    <Info>
                      <Category>{post.category}</Category>
                      <CreationDate>{post.modified}</CreationDate>
                      <Title>{post.title}</Title>
                      {post.excerpt && (
                        <Description>{post.excerpt}</Description>
                      )}
                    </Info>
                  </Post>
                </PostContainer>
              ))}
          </Posts>
          {visible < blogPosts?.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>
                Load More
              </LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};
