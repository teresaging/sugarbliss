import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button, fonts } from '../design-system';
import { sizing } from '../utils';

import 'fontsource-sacramento';

import { colors } from '../utils';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CONTENT_POSITIONS = {
  TOP_CENTER: 'topCenter',
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_CENTER: 'bottomCenter',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
  CENTER: 'center',
};

enum BACKGROUND_IMAGE_POSITIONS {
  TOP_CENTER = 'top center',
  TOP_LEFT = 'top left',
  TOP_RIGHT = 'top right',
  CENTER_LEFT = 'center left',
  CENTER = 'center',
  CENTER_RIGHT = 'center right',
  BOTTOM_LEFT = 'bottom left',
  BOTTOM_CENTER = 'bottom center',
  BOTTOM_RIGHT = 'bottom right',
};

export type SlideTypes = {
  node: {
    position: number;
    textPosition: keyof typeof CONTENT_POSITIONS;
    buttonLink: string;
    buttonText: string;
    // tslint:disable-next-line:no-any
    childContentfulHomepageHeroTextRichTextNode: any; // supports rich text
    backgroundImage: {
      file: {
        url: string;
      };
    },
    pdf?: {
      file: {
        url: string;
      }
    }
    backgroundImagePosition: BACKGROUND_IMAGE_POSITIONS;
  }
}

type Props = {
  slideData: SlideTypes[];
  isMobile: boolean;
}

const SLIDER_SETTINGS = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Bold = ({ children }) => <BoldCarouselText>{children}</BoldCarouselText>;
const Text = ({ children }) => <CarouselText>{children}</CarouselText>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {

      return <img src={node.data.target.fields.file['en-US'].url} width={node.data.target.fields.file['en-US'].details.image.width} height={node.data.target.fields.file['en-US'].details.image.height} />
      },
  },
}

const HomepageHero = ({slideData, isMobile}: Props) => {

  return (
    <HomepageHeroWrapper>
      <Slider {...SLIDER_SETTINGS}>
        {slideData.map((slide) => (
          <Slide
            contentPosition={slide.node.textPosition}
            backgroundImage={slide.node.backgroundImage.file.url}
            backgroundImagePosition={slide.node.backgroundImagePosition}
            key={slide.node.position}>
            {slide.node.textPosition === CONTENT_POSITIONS.CENTER ? (
              <ContentCenteredContainer>
                {slide.node.childContentfulHomepageHeroTextRichTextNode && documentToReactComponents(slide.node.childContentfulHomepageHeroTextRichTextNode.json, options)}
                <Button url={slide.node?.pdf?.file?.url || slide.node?.buttonLink} size={isMobile ? 'SMALL' : 'LARGE'} text={slide.node.buttonText} />
              </ContentCenteredContainer>
            ) : (
              <ContentContainer>
                {slide.node.childContentfulHomepageHeroTextRichTextNode && documentToReactComponents(slide.node.childContentfulHomepageHeroTextRichTextNode.json, options)}
                <Button url={slide.node?.pdf?.file?.url || slide.node?.buttonLink} size={isMobile ? 'SMALL' : 'LARGE'} text={slide.node.buttonText} />
              </ContentContainer>
            )}
          </Slide>
        ))}
      </Slider>
    </HomepageHeroWrapper>
  )
};

const HomepageHeroWrapper = styled.div`
    width: 100%;
    position: relative;
    
    .slick-next {
      right: ${sizing(4)};
    }
    
    .slick-prev {
      left: ${sizing(3)};
      z-index: 1;
    }
    
    .slick-prev:before, .slick-next:before {
      color: ${colors.solids.BROWN};
      font-size: ${sizing(12)};
        @media all and (min-width: 768px) {
          font-size: ${sizing(32)};
        }
      }

    .slick-dots {
      bottom: 0;
      li {
        margin: 0;
        @media all and (min-width: 768px) {
          margin: 0 ${sizing(5)};
        }
      }
    }
    
    .slick-arrow {
      width: ${sizing(15)};
      height: ${sizing(15)};
      @media all and (min-width: 768px) {
        width: ${sizing(32)};
        height: ${sizing(32)};
      }
    }
    
    .slick-dots li button:before {
      font-size: ${sizing(5)};
      color: ${colors.solids.BROWN};
      @media all and (min-width: 768px) {
        font-size: ${sizing(12)};
      }
    }
    
    .slick-dots li.slick-active button:before {
      color: ${colors.solids.BROWN};
    }
    
`

export const getSlideLayoutStyles = (position: string) => {
  switch (position) {
    case CONTENT_POSITIONS.TOP_CENTER: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: center;
        align-items: flex-start;
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_CENTER: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: center;
        align-items: flex-end;
      `;
    }
    case CONTENT_POSITIONS.TOP_LEFT: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: flex-start;
        align-items: flex-start;
      `;
    }
    case CONTENT_POSITIONS.TOP_RIGHT: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: flex-end;
        align-items: flex-start;
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_LEFT: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: flex-start;
        align-items: flex-end;
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_RIGHT: {
      return `
        padding: ${sizing(15)} ${sizing(15)}!important;
        justify-content: flex-end;
        align-items: flex-end;
      `;
    }
    case CONTENT_POSITIONS.CENTER: {
      return `
        justify-content: center;
        align-items: center;
      `;
    }
    default: {
      return `
        justify-content: center;
        align-items: center;
      `;
    }
  }
};

const Slide = styled.div<{backgroundImage: string, backgroundImagePosition: string, contentPosition: string }>`
  background-image: ${({backgroundImage}) => `url(${backgroundImage})`};
  background-position: ${({backgroundImagePosition}) => Boolean(backgroundImagePosition) ? backgroundImagePosition : 'center'};
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 250px;
  display: flex !important;
  ${({ contentPosition }) => getSlideLayoutStyles(contentPosition)};
  @media all and (min-width: 1265px) {
    background-size: 100%;
    height: 425px;
  }
`;

const ContentCenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: rgba(255,255,255,.7);
    padding: ${sizing(20)};
    border: solid 4px white;
    max-width: 486px;
    p {
      ${fonts.regularText['100']};
      @media all and (min-width: 1265px) {
        ${fonts.regularText['600']};
      }
    }
    img {
      min-width: ${sizing(50)};
      height: auto;
      @media all and (max-width: 767px) {
        margin-bottom: 0;
      }
    }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CarouselText = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 1265px) {
    ${fonts.regularText['600']};
  }
`;

const BoldCarouselText = styled.p`
  ${fonts.boldText['100']};
  @media all and (min-width: 1265px) {
    ${fonts.boldText['600']};
  }
`;

export default HomepageHero;