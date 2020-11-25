import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import { fonts, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';
import { FrostingShot } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type FrostingShotsQueryProps = {
  underlineImage: FluidImage;
  allContentfulFrostingShots: {
    nodes: FrostingShot[]; // Todo: add shared cupcake type here
  };
}

type FrostingShotsProps = PageProps<FrostingShotsQueryProps>;

const FrostingShots = ({data}: FrostingShotsProps) => {

  const frostingData = data.allContentfulFrostingShots.nodes[0];

  return (
    <Layout>
      <ProductHeader productName="Frosting Shots" imageUrl={frostingData.image.file.url} underlineImage={data.underlineImage} />
      <PriceSection>
        <Price>Price: ${frostingData.price}</Price>
        <Underline />
      </PriceSection>
      <FlavorsSection>
        <FlavorsTitle>
          Flavors:
        </FlavorsTitle>
        {frostingData.flavors.map((flavor, idx) => (
          <Flavor key={idx}>{flavor}</Flavor>
        ))}
      </FlavorsSection>
    </Layout>
  );
};

const PriceSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(40)} 0;
  margin: ${sizing(50)} 0;
`;

const Price = styled.div`
  ${fonts.boldText['600']};
  text-align: center;
`;

const Underline = styled.hr`
  border-top: 2px solid ${colors.solids.BROWN};
  width: ${sizing(40)};
  margin-top: ${sizing(7)};
  margin-bottom: 0;
`;

const FlavorsSection = styled.div`
  margin-top: ${sizing(75)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(75)};
`;

const FlavorsTitle = styled.p`
  ${fonts.cursiveText['800']};
  color: ${colors.solids.BROWN};
  margin-bottom: ${sizing(30)};
`;

const Flavor = styled.p`
  ${fonts.regularText['400']};
  color: ${colors.solids.BROWN};
`;

export default FrostingShots;

export const query = graphql`
  query FrostingShotsQuery {
    allContentfulFrostingShots(filter: {name: {eq: "Frosting Shot"}}) {
      nodes {
        image {
          file {
            url
          }
        }
        price
        flavors
      }
    }
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
