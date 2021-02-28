import React from 'react';
import { FluidObject } from 'gatsby-image';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import styled from '@emotion/styled';

import { ProductHeader, ProductList, fonts } from '../design-system';
import { MorningPastry } from '../sharedTypes';
import { sizing } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type MorningPastriesQueryProps = {
  productBreakfastCupcakesImage: FluidImage;
  underlineImage: FluidImage;
  allContentfulMorningPastries: {
    nodes: MorningPastry[];
  }
}

type MorningPastriesProps = PageProps<MorningPastriesQueryProps>;

const MorningPastriesPage = ({data}: MorningPastriesProps) => {

  const getMuffinsData = () => {
    const muffinsData = data.allContentfulMorningPastries?.nodes?.filter((item) => item.name === 'Muffins')[0];
    const flavors = muffinsData.flavors.map((flavor) => {
      return {
        name: flavor,
      }
    });

    return {
      ...muffinsData,
      flavors,
    }
  }

  const getSconesData = () => {
    const sconesData = data.allContentfulMorningPastries?.nodes?.filter((item) => item.name === 'Scones')[0];
    const flavors = sconesData.flavors.map((flavor) => {
      return {
        name: flavor,
      }
    });

    return {
      ...sconesData,
      flavors,
    }
  }

  const muffins = getMuffinsData();
  const scones = getSconesData();

  const otherTreats = data.allContentfulMorningPastries?.nodes?.filter((item) => {
    return item.name !== 'Muffins' && item.name !== 'Scones';
  }).reverse();

  return (
    <Layout>
      <ProductHeader productName="Morning Pastries" backgroundImage={data.productBreakfastCupcakesImage} underlineImage={data.underlineImage} />
      <Row>
        {Boolean(muffins) && (
          <HighlightedProduct>
            <ProductList title={muffins.name} price={muffins.price} dozenPrice={muffins.dozenPrice} flavors={muffins.flavors}/>
          </HighlightedProduct>
        )}
        {Boolean(scones) && (
          <HighlightedProduct>
            <ProductList title={scones.name} price={scones.price} dozenPrice={scones.dozenPrice} flavors={scones.flavors}/>
          </HighlightedProduct>
        )}
      </Row>
      {Boolean(otherTreats) && (
        <OtherTreatsContainer>
          <Title>Other Treats</Title>
          {otherTreats.map((item, idx) => (
            <OtherTreat key={idx}>
              <OtherTreatName>{item.name}</OtherTreatName>
              {Boolean(item.description) && <OtherTreatDescription>{item.description}</OtherTreatDescription>}
              <OtherTreatsPrice>{Boolean(item.dozenPrice) ? `Single: $${item.price} | Dozen: $${item.dozenPrice}` : `$${item.price}` }</OtherTreatsPrice>
            </OtherTreat>
          ))}
        </OtherTreatsContainer>
      )}
    </Layout>
  );
}

export default MorningPastriesPage;

const HighlightedProduct = styled.div`
  margin: ${sizing(30)} auto ${sizing(10)} auto;
  width: 85%;
  @media all and (min-width: 768px) {
    margin: ${sizing(100)} auto ${sizing(75)} auto;
  }
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 85%;
  margin: auto;
  @media all and (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    width: 60%;
  }
`;

const Title = styled.p`
  ${fonts.cursiveText['600']};
  text-align: center;
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(50)};
    ${fonts.cursiveText['900']};
  }
`

const OtherTreatsContainer = styled.div`
  margin: ${sizing(20)} auto;
  width: 85%;
  dispay: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media all and (min-width: 768px) {
    margin: ${sizing(75)} auto ${sizing(75)} auto;
  }
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const OtherTreat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${sizing(30)}
`;

const OtherTreatName = styled.p`
  ${fonts.boldText['300']};
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

const OtherTreatDescription = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`;

const OtherTreatsPrice = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`

export const query = graphql`
query MorningPastriesQuery {
  allContentfulMorningPastries {
    nodes {
      name
      description
      flavors
      price
      dozenPrice
    }
  }
  productBreakfastCupcakesImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_breakfastcupcakes\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
    childImageSharp {
      fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`
