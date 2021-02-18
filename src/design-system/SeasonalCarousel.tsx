import React from 'react';
import Slider from 'react-slick';

import styled from '@emotion/styled';

import { colors, sizing } from '../utils';
import { fonts } from '../design-system';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SLIDER_SETTINGS = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

type SeasonalProduct = {
  name: string;
  imageUrl: string;
  datesAvailable?: string;
  description?: string;
};

type Props = {
  seasonalProducts: SeasonalProduct[];
}

const SeasonalCarousel = ({seasonalProducts = []}: Props) => {

  return (
    <Container >
      <Slider {...SLIDER_SETTINGS}>
        {seasonalProducts.map((product, idx) => {
          return (
            <Slide key={idx}>
              {idx % 2 === 0 && (
                <LeftImageContainer>
                  <Image src={product.imageUrl} />
                </LeftImageContainer>
              )}
              <ProductInfoContainer>
                <MobileImage src={product.imageUrl} />
                <Name>{product.name}</Name>
                {product.datesAvailable && (<DatesAvailable>{product.datesAvailable}</DatesAvailable>)}
                {product.description && (<Description>{product.description}</Description>)}
              </ProductInfoContainer>
              {idx % 2 !== 0 && (
                <RightImageContainer>
                  <Image src={product.imageUrl} />
                </RightImageContainer>
              )}
            </Slide>
          )
        })
        }
      </Slider>
    </Container>
  )
};

const Container = styled.div`
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

const Slide = styled.div`
   width: 100%;
   height: ${sizing(300)};
   display: flex !important;
   justify-content: center;
   align-items: center;
  flex-direction: column;
  @media all and (min-width: 768px) {
    height: ${sizing(500)};
    flex-direction: row;
  }
`;

const Image = styled.img`
  border-radius: 50%;
  width: ${sizing(300)};
  min-width: ${sizing(150)};
  height: auto;
  display: none;
  @media all and (min-width: 768px) {
    display: block;
  }
`;

const MobileImage = styled.img`
  border-radius: 50%;
  width: 50%;
  height: auto;
  margin: auto;
  @media all and (min-width: 768px) {
    display: none !important; // need to override slick-slide
  }
`;

const Name = styled.p`
  ${fonts.cursiveText['500']};
  margin-bottom: ${sizing(5)};
  margin-top: ${sizing(10)};
  text-align: center;
  @media all and (min-width: 768px) {
    margin-top: 0;
    margin-bottom: ${sizing(10)};
    ${fonts.cursiveText['900']};
    text-align: left;
  }
`;

const DatesAvailable = styled.p`
  ${fonts.boldText['100']};
  margin-bottom: ${sizing(5)};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['500']};
    text-align: left;
    margin-bottom: ${sizing(10)};
  }
`;

const Description = styled.p`
  ${fonts.regularText['100']};
  margin-top: ${sizing(5)};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['400']};
    text-align: left;
    margin-top: ${sizing(20)};
  }
`;

const LeftImageContainer = styled.div`
  margin-right: ${sizing(20)};
  display: none;
  @media all and (min-width: 768px) {
    display: block;
  }
`;

const RightImageContainer = styled.div`
  margin-left: ${sizing(20)};
  display: none;
  @media all and (min-width: 768px) {
    display: block;
  }
`;

const ProductInfoContainer = styled.div`
  max-width: ${sizing(480)};
`;

export default SeasonalCarousel;