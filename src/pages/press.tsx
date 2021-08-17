import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled';

import Layout from '../components/layout';
import { ProductHeader, fonts } from '../design-system';
import { sizing, colors } from '../utils';
import { Press } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type PressPageQueryProps = {
  underlineImage: FluidImage;
  allContentfulPressPage: {
    nodes: {
      press: Press[]
    };
  };
}

type PressPageProps = PageProps<PressPageQueryProps>;

const PressPage = ({data}: PressPageProps) => {

  const pressItems = data.allContentfulPressPage.nodes[0].press;

  return (
    <Layout>
      <ProductHeader underlineImage={data.underlineImage} productName="Press" />
      <Content>
        {pressItems.map((item, idx) => (
          <Square key={idx}>
            <Link target="_blank" href={item.pdf ? item.pdf.file.url : item.link}>
              <Title>{item.name}</Title>
              {item.site && (<SiteName>{item.site}</SiteName>)}
            </Link>
          </Square>
        ))
        }
      </Content>
    </Layout>
  );
}

const Content = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  display: grid;
  grid-template-columns: repeat(1fr);
  @media all and (min-width: 992px) {
     width: 60%;
      grid-template-columns: repeat(3,1fr);
  }
`;

const Square = styled.div`
  background-color: ${colors.solids.BABY_PINK};
  max-width: ${sizing(300)};
  flex: 1 1 0;
  margin: 0 ${sizing(20)} ${sizing(50)} ${sizing(20)};
  padding: ${sizing(25)};
  border-radius: ${sizing(20)};
  text-align: center;
`;

const Link = styled.a`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  ${fonts.boldText['600']};
`;

const SiteName = styled.p`
  ${fonts.regularText['500']};
  margin-bottom: 0;
`;

export default PressPage;

export const query = graphql`
  query PressPageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulPressPage {
      nodes {
        press {
          name
          site
          pdf {
            file {
              url
            }
          }
          link
        }
      }
    }
  }
`;
