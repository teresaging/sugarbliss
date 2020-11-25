import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { fonts, ProductHeader } from '../design-system';
import { Cakes } from '../sharedTypes';
import { sizing, colors } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CakesQueryProps = {
  underlineImage: FluidImage;
  cakesHeaderImage: FluidImage;
  allContentfulCakes: {
    nodes: Cakes[];
  };
}

type CakesPageProps = PageProps<CakesQueryProps>;

const CakesPage = ({data}: CakesPageProps) => {

  const sixInchCakesData = data.allContentfulCakes.nodes.filter((item) => item.category === '6" Round Cake');
  const sheetCakesData = data.allContentfulCakes.nodes.filter((item) => item.category === 'Sheet Cakes');
  const customOptionsData = data.allContentfulCakes.nodes.filter((item) => item.category === 'Custom Options');

  return (
    <Layout>
      <ProductHeader productName="Cakes" backgroundImage={data.cakesHeaderImage} underlineImage={data.underlineImage} />
      {sixInchCakesData && (
        <Section>
          {sixInchCakesData.map((item, idx) => (
            <ItemContainer key={idx}>
              <ItemTitle>{item.name}</ItemTitle>
              <Price>${item.price}</Price>
              <Description>{item.servingDescription}</Description>
              <Description>{item.description}</Description>
            </ItemContainer>
          ))}
        </Section>
      )}
      {sheetCakesData && (
        <Section>
          {sheetCakesData.map((item, idx) => (
            <ItemContainer key={idx}>
              <ItemTitle>{item.name}</ItemTitle>
              <Price>Starts at ${item.price}</Price>
              <Description>{item.servingDescription}</Description>
            </ItemContainer>
          ))}
        </Section>
      )}
      {customOptionsData && (
        <Section>
          {customOptionsData.map((item, idx) => (
            <ItemContainer key={idx}>
              <ItemTitle>{item.name}</ItemTitle>
              <Price>{item.name === 'Custom coloring' ? `$${item.price} per color` : `$${item.price}`}</Price>
            </ItemContainer>
          ))}
        </Section>
      )}
    </Layout>
  );
}

export default CakesPage;

const Section = styled.div`
  margin: ${sizing(50)} auto ${sizing(50)} auto;
  width: 90%;
  @media all and (min-width: 992px) {
    width: 50%;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(75)};
`;

const ItemTitle = styled.p`
  ${fonts.cursiveText['800']};
  text-align: center;
`;

const Price = styled.p`
  ${fonts.boldText['600']};
  text-align: center;
`;

const Description = styled.p`
  ${fonts.regularText['400']};
  text-align: center;
`;

export const query = graphql`
  query CakesQuery {
    allContentfulCakes {
      nodes {
        name
        category
        price
        servingDescription
        description
      }
    }
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cakesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cakes\\/cakesHeaderImage\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
