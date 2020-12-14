import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';
import { groupBy } from 'lodash';

import Layout from '../components/layout';
import { ProductHeader, OrderFooter, fonts, Button } from '../design-system';

import { sizing, colors } from '../utils';
import { Weddings } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type WeddingsQueryProps = {
  allContentfulWeddings: {
    nodes: Weddings[];
  };
  underlineImage: FluidImage;
  weddingsHeaderImage: FluidImage;
  weddingsFooterImage: FluidImage;
  weddingsCupcakeImage: FluidImage;
}

type WeddingsPageProps = PageProps<WeddingsQueryProps>;

const WeddingsPage = ({data}: WeddingsPageProps) => {

  const renderSectionWithFlavorList = ({title, flavors, price, miniPrice = 0, priceAmount}) => {
    return (
      <Section>
        <SectionTitle>{title}</SectionTitle>
        {miniPrice > 0 ? (
          <MultiplePriceWrapper>
            <div>
              <MultiplePriceType>
                Regular {title}
              </MultiplePriceType>
              <MultiplePrice>
                ${price} {priceAmount}
              </MultiplePrice>
            </div>
            <div>
              <MultiplePriceType>
                Mini {title}
              </MultiplePriceType>
              <MultiplePrice>
                ${price} {priceAmount}
              </MultiplePrice>
            </div>
          </MultiplePriceWrapper>
        ) : (
          <div>
            <Price>${price} {priceAmount}</Price>
          </div>
        )}
        <FlavorList>
          {flavors.map((flavor, idx) => (
            <Flavor key={idx}>
              {flavor} {flavors.length - 1 !== idx && '•'}
            </Flavor>
          ))}
        </FlavorList>
      </Section>
    );
  }

  const allProducts = groupBy(data.allContentfulWeddings.nodes, 'type');

  const productCategories = Object.keys(groupBy(data.allContentfulWeddings.nodes, 'type'));

  return (
    <Layout>
      <ProductHeader productName="Weddings" backgroundImage={data.weddingsHeaderImage} underlineImage={data.underlineImage} isFullWidth />
      <PriceSection>
        <Button url="/" text="Wedding Brochure" size="LARGE" />
      </PriceSection>
      <Content>
        <CupcakeImageContainer>
          <CupcakeImage fluid={data.weddingsCupcakeImage.childImageSharp.fluid} />
        </CupcakeImageContainer>
        {productCategories.map((category, idx) => (
          <div key={idx}>
            {allProducts[category].length === 1 && allProducts[category][0].flavors?.length > 0 ? (
              <div>
                {renderSectionWithFlavorList({
                  title: allProducts[category][0]?.name,
                  flavors: allProducts[category][0]?.flavors,
                  price: allProducts[category][0]?.price,
                  miniPrice: allProducts[category][0]?.miniPrice,
                  priceAmount: allProducts[category][0]?.priceAmount
                })}
              </div>
            ) : (
              <Section>
                <SectionTitle>
                  {category}
                </SectionTitle>
                {allProducts[category].map((product, idx) => (
                  <ProductInfo key={idx}>{product.name} | {product.price ? `$${product.price} ${product.priceAmount}` : product.priceRange}</ProductInfo>
                ))}
                {category === 'display options' && (
                  <>
                    <ProductInfo>*Price denotes tier only</ProductInfo>
                    <ProductInfo>*Set up and delivery available as an add-on</ProductInfo>
                  </>
                )}
              </Section>
            )}
          </div>
        ))}
      </Content>
      <OrderFooter backgroundImage={data.weddingsFooterImage} />
    </Layout>
  );
};

const Content = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(120)}
`;

const CupcakeImageContainer = styled.div`
  margin: ${sizing(35)} auto ${sizing(100)} auto;
  width: ${sizing(350)};
  height: ${sizing(350)};
  border-radius: 50%;
  overflow: hidden;
  display: block;
`;

const CupcakeImage = styled(Img)`
  width: 100%;
  height: auto;
`;

const PriceSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.solids.BABY_PINK};
  padding: ${sizing(40)} 0;
  margin: ${sizing(50)} 0;
`;

const SectionTitle = styled.p`
  ${fonts.cursiveText['1200']};
  margin-bottom: ${sizing(40)};
  text-transform: capitalize;
`;

const MultiplePriceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${sizing(100)};
`;

const MultiplePriceType = styled.p`
  ${fonts.boldText['600']};
  text-align: center;
`;

const MultiplePrice = styled.p`
   ${fonts.regularText['400']};
   text-align: center;
`;

const Price = styled.p`
 ${fonts.boldText['600']};
`;

const FlavorList = styled.p`
  ${fonts.regularText['200']};
  text-align: center;
  margin-top: ${sizing(20)};
`;

const Flavor = styled.span`
  margin-right: ${sizing(6)};
`;

const ProductInfo = styled.p`
 ${fonts.regularText['300']};
 text-align: center;
`;

export default WeddingsPage;

export const query = graphql`
  query WeddingsPageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    weddingsHeaderImage: file(absolutePath: {regex: "/\\/images\\/weddings\\/weddings_header\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    weddingsFooterImage: file(absolutePath: {regex: "/\\/images\\/weddings\\/weddings_footer\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    weddingsCupcakeImage: file(absolutePath: {regex: "/\\/images\\/weddings\\/wedding_cupcake\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulWeddings(sort: {fields: createdAt}) {
      nodes {
        name
        price
        priceAmount
        priceRange
        miniPrice
        flavors
        type
      }
    }
  }
`