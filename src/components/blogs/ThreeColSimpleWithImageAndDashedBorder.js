import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as TagIcon } from "feather-icons/dist/icons/tag.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-3.svg";
import { useBlog } from "../context/BlogContext.js";
import useFetchBlogs from "pages/FetchBlogs";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`font-sans mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full shadow-2xl`;
const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`,
]);

const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none border-dashed border-primary-100 flex-1 flex flex-col items-center text-center lg:block lg:text-left`;
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-sans font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;

const Title = tw.h5`mt-4 leading-snug text-lg`;
const Description = tw.p`font-sans mt-2 text-sm text-secondary-100`;
const Link = styled(PrimaryButtonBase).attrs({ as: "a" })`
  ${tw`font-sans inline-block mt-4 text-sm font-semibold`}
`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

export default ({
  subheading = "Blog",
  heading = <>Learn With Me</>,
  description = "Explore the Essence of Cooking: Dive into Recipes, Master Techniques, and Discover Essential Equipment",
}) => {
  useFetchBlogs();
  const { blogPosts } = useBlog();
  const [previewBlogs, setPreviewBlogs] = useState([]);

  useEffect(() => {
    if (blogPosts && blogPosts.length > 0) {
      const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setPreviewBlogs(sortedPosts.slice(0, 3));
    }
  }, [blogPosts]);

  useEffect(() => {
    console.log("previewBlogs --> ", previewBlogs);
  }, [previewBlogs]);

  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          {/* {subheading && <Subheading>{subheading}</Subheading>} */}
          <HeadingTitle>{heading}</HeadingTitle>
          <HeadingDescription>{description}</HeadingDescription>
        </HeadingInfoContainer>
        <ThreeColumn>
          {previewBlogs.map((post, index) => (
            <Column key={index}>
              <Card>
                <Image imageSrc={post.thumbnailUrl} />
                <Details>
                  <MetaContainer>
                    {/* <Meta>
                      <UserIcon />
                      <div>{post.author}</div>
                    </Meta> */}
                    <Meta>
                      <TagIcon />
                      <div>{post.category}</div>
                    </Meta>
                  </MetaContainer>
                  <Title>{post.title}</Title>
                  <Description>{post.excerpt}</Description>
                  <Link href={post.url}>Read Post</Link>
                </Details>
              </Card>
            </Column>
          ))}
        </ThreeColumn>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
