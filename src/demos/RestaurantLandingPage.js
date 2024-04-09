import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import HeroImageSrc from "../assets/images/BreadAndHummus.jpg";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import BlogPreview from "components/blogs/ThreeColSimpleWithImageAndDashedBorder.js";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block font-display font-light`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8 font-sans`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage disabled>
      <Hero
        heading={
          <>
            Namak Swadanusar
            {/* <HighlightedText>Namak Swadanusar</HighlightedText> */}
          </>
        }
        description={
          <Description>
            Savour the spice of life at and embark on a culinary journey with
            us, where traditional Indian cooking meets the world’s flavors.
            <br />
            <br />
            From the bustling streets of Tripura to the heart of Paris, our
            recipes, cooking techniques, and equipment guides are your passport
            to global cuisine right from your kitchen
          </Description>
        }
        imageSrc={HeroImageSrc}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Channel Trailer"
      />

      {<BlogPreview />}
      {<ContactUsForm />}
      {/* <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={
          <>
            Why <HighlightedText>Choose Us ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+",
          },
          {
            key: "Chefs",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      /> */}

      <Footer />
    </AnimationRevealPage>
  );
};
