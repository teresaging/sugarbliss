import React from 'react';
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

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <BoldCarouselText>{text}</BoldCarouselText>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1Text>{children}</H1Text>,
    [BLOCKS.HEADING_2]: (node, children) => <H2Text>{children}</H2Text>,
    [BLOCKS.HEADING_3]: (node, children) => <H3Text>{children}</H3Text>,
    [BLOCKS.PARAGRAPH]: (node, children) => <CarouselText>{children}</CarouselText>,
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
                <Button openInNewTab={Boolean(slide.node?.pdf?.file?.url)} url={slide.node?.pdf?.file?.url || slide.node?.buttonLink} size={isMobile ? 'SMALL' : 'LARGE'} text={slide.node.buttonText} />
              </ContentCenteredContainer>
            ) : (
              <ContentContainer>
                {slide.node.childContentfulHomepageHeroTextRichTextNode && documentToReactComponents(slide.node.childContentfulHomepageHeroTextRichTextNode.json, options)}
                <Button openInNewTab={Boolean(slide.node?.pdf?.file?.url)} url={slide.node?.pdf?.file?.url || slide.node?.buttonLink} size={isMobile ? 'SMALL' : 'LARGE'} text={slide.node.buttonText} />
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
        padding: ${sizing(15)};
        justify-content: center;
        align-items: flex-start;
        @media all and (min-width: 1265px) {
          padding: ${sizing(40)};
        }
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_CENTER: {
      return `
        padding: ${sizing(15)};
        justify-content: center;
        align-items: flex-end;
        @media all and (min-width: 1265px) {
          padding: ${sizing(40)};
        }
      `;
    }
    case CONTENT_POSITIONS.TOP_LEFT: {
      return `
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: ${sizing(50)};
        padding-left: ${sizing(50)};
        @media all and (min-width: 1265px) {
          padding-top: ${sizing(100)};
          padding-left: ${sizing(200)};
        }
      `;
    }
    case CONTENT_POSITIONS.TOP_RIGHT: {
      return `
        justify-content: flex-end;
        align-items: flex-start;
        padding-top: ${sizing(50)};
        padding-right: ${sizing(50)};
        @media all and (min-width: 1265px) {
          padding-top: ${sizing(100)};
          padding-right: ${sizing(200)};
        }
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_LEFT: {
      return `
        justify-content: flex-start;
        align-items: flex-end;
        padding-bottom: ${sizing(50)};
        padding-left: ${sizing(50)};
        @media all and (min-width: 1265px) {
          padding-bottom: ${sizing(100)};
          padding-left: ${sizing(200)};
        }
      `;
    }
    case CONTENT_POSITIONS.BOTTOM_RIGHT: {
      return `
        justify-content: flex-end;
        align-items: flex-end;
        padding-bottom: ${sizing(50)};
        padding-right: ${sizing(50)};
        @media all and (min-width: 1265px) {
          padding-bottom: ${sizing(100)};
          padding-right: ${sizing(200)};
        }
      `;
    }
    case CONTENT_POSITIONS.CENTER: {
      return `
        padding: ${sizing(15)};
        justify-content: center;
        align-items: center;
        @media all and (min-width: 1265px) {
          padding: ${sizing(40)};
        }
      `;
    }
    default: {
      return `
        padding: ${sizing(15)};
        justify-content: center;
        align-items: center;
        @media all and (min-width: 1265px) {
          padding: ${sizing(40)};
        }
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
  @media all and (min-width: 1265px) {
    background-size: 100%;
    height: 425px;
  }
  ${({ contentPosition }) => getSlideLayoutStyles(contentPosition)};
`;

const ContentCenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background-color: rgba(255,255,255,.7);
    padding: ${sizing(5)};
    border: solid 4px white;
    width: 95%;
    max-width: ${sizing(550)};
    @media all and (min-width: 1265px) {
      padding: ${sizing(20)};
    }
    p {
      ${fonts.regularText['100']};
      @media all and (min-width: 1265px) {
        ${fonts.regularText['600']};
      }
    }
    img {
      min-width: ${sizing(50)};
      width: 100%;
      max-width: ${sizing(550)};
      height: auto;
      @media all and (max-width: 767px) {
        margin-bottom: 0;
        max-width: ${sizing(250)};
        width: 80%;
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

const H1Text = styled.h1`
  ${fonts.cursiveText['500']};
  text-align: center;
  @media all and (min-width: 1265px) {
    ${fonts.cursiveText['1200']};
  }
`;

const H2Text = styled.h2`
  text-align: center;
  ${fonts.boldText['300']};
  @media all and (min-width: 1265px) {
    ${fonts.boldText['1000']};
  }
`;

const H3Text = styled.h3`
  ${fonts.boldText['200']};
  @media all and (min-width: 1265px) {
    ${fonts.boldText['800']};
  }
`;

export default HomepageHero;