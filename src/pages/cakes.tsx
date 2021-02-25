import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { fonts, ProductHeader } from '../design-system';
import { Cakes } from '../sharedTypes';
import { sizing } from '../utils';

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
      <Section>
        <OrderingInfo>
          <h5>Ordering Info</h5>
          <p>6" round cakes must be ordered 48 hours in advance.</p>
        </OrderingInfo>
      </Section>
    </Layout>
  );
}

export default CakesPage;

const Section = styled.div`
  margin: ${sizing(10)} auto ${sizing(10)} auto;
  width: 90%;
  @media all and (min-width: 992px) {
    margin: ${sizing(50)} auto ${sizing(50)} auto;
    width: 50%;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 992px) {
    margin-bottom: ${sizing(50)};

  }
`;

const ItemTitle = styled.p`
  ${fonts.cursiveText['500']};
  text-align: center;
  @media all and (min-width: 992px) {
    ${fonts.cursiveText['900']};
  }
`;

const Price = styled.p`
  ${fonts.boldText['200']};
  text-align: center;
  @media all and (min-width: 992px) {
    ${fonts.cursiveText['600']};
  }
`;

const Description = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  @media all and (min-width: 992px) {
    ${fonts.regularText['400']};
  }
`;

const OrderingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5 {
    ${fonts.boldText['400']};
    text-align: center;
    @media all and (min-width: 992px) {
      ${fonts.boldText['800']};
    }
  }
  p {
    ${fonts.regularText['100']};
    text-align: center;
    @media all and (min-width: 992px) {
      ${fonts.regularText['400']};
    }
  }
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
