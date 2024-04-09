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
import SecondHeroImage from "../assets/images/Pizza.jpg";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import BlogPreview from "components/blogs/ThreeColSimpleWithImageAndDashedBorder.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";

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
            Savour the spice of life at{" "}
            <HighlightedText>Namak Swadanusar</HighlightedText>
          </>
        }
        description={
          <Description>
            Embark on a culinary journey with us, where traditional Indian
            cooking meets the world’s flavors.
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
      <MainFeature
        subheading={<Subheading>Inception: 2019</Subheading>}
        heading={
          <>
            We've been creating for
            <wbr /> <HighlightedText>over 5 years.</HighlightedText>
          </>
        }
        description={
          <Description>
            From a heartfelt expression of love in every dish to a global
            culinary expedition, Namak Swadanusar embodies the journey from
            passion to brand
            <br />
            <br />
            celebrating, educating, and sharing the magic of traditional and
            modern recipes with the world
          </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Latest Offers"
        imageSrc={SecondHeroImage}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />

      <Features
        heading={
          <>
            Our <HighlightedText>Focus</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "Recipes",
            description:
              "Where Every Recipe Tells a Story and Every Dish Brings the World to Your Table.",
            url: "https://google.com",
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Techniques",
            description:
              "Unlock the Artistry of Cooking: Techniques That Transform Good into Gourmet.",
            url: "https://timerse.com",
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Equipments",
            description:
              "From Whisk to Wok: Equip Your Culinary Dreams with the Perfect Kitchen Allies",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
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
