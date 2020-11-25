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
  macaronsHeaderImage: FluidImage;
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

  console.log('otherTreats', otherTreats);

  return(
    <Layout>
      <ProductHeader productName="Morning Pastries" backgroundImage={data.macaronsHeaderImage} underlineImage={data.underlineImage} />
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
  margin: ${sizing(75)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const Title = styled.p`
  ${fonts.cursiveText['800']};
  text-align: center;
  margin-bottom: ${sizing(50)};
`;

const OtherTreatsContainer = styled.div`
  margin: ${sizing(75)} auto ${sizing(75)} auto;
  width: 85%;
  dispay: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  ${fonts.boldText['400']};
`;

const OtherTreatDescription = styled.p`
  ${fonts.regularText['300']};
`;

const OtherTreatsPrice = styled.p`
  ${fonts.regularText['300']};
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
  macaronsHeaderImage: file(absolutePath: {regex: "/\\/images\\/macarons\\/macaronsHeaderImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
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
