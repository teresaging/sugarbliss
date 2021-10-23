import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import { ProductHeader, fonts, Button } from '../design-system';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { sizing, colors } from '../utils';
import { SweetsCartPage as SweetsCartPageType } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type SweetsCartQueryProps = {
  sweetsCartHeaderImage: FluidImage;
  underlineImage: FluidImage;
  allContentfulSweetsCartPage: {
    nodes: SweetsCartPageType[];
  };
};

type SweetsCartProps = PageProps<SweetsCartQueryProps>;

const SweetsCartPage = ({data}: SweetsCartProps) => {

  const pageData = data.allContentfulSweetsCartPage.nodes[0];
  const productsWithImage = pageData.products.filter((product) => product.image);
  const productsWithoutImage = pageData.products.filter((product) => !product.image);

  const renderSweetsCartProductWithImage = (product) => {
    return (
      <Product key={product.name}>
        {Boolean(product.image) && <ProductImageContainer><ProductImage src={product.image.file.url}/></ProductImageContainer>}
        {renderSweetsCartProductWithoutImage(product)}
      </Product>
    );
  }

  const renderSweetsCartProductWithoutImage = (product) => {
    return (
      <ProductText>
        <Name>{product.name}</Name>
        {Boolean(product.price) && (
          <ProductPrice>
            {Boolean(product.dozenPrice) ? `Single: $${product.price} | Dozen: $${product.dozenPrice}` : `${product.price}`}
          </ProductPrice>
        )}
        {Boolean(product.description) && <Description><ReactMarkdown>{product.description.childMarkdownRemark.rawMarkdownBody}</ReactMarkdown></Description>}
        {Boolean(product.flavors) && <Flavors>{product.flavors.map((flavor, idx) => `${flavor}${idx !== product.flavors.length - 1 ? ', ' : ''}`)}</Flavors>}
      </ProductText>
    );
  }

  return(
    <Layout>
      <ProductHeader underlineImage={data.underlineImage} productName="Sweets Cart" />
      <ContentContainer>
        <Header>
          <HeaderImageContainer>
            <HeaderImage src={pageData.sweetsCartImage.file.url} />
          </HeaderImageContainer>
          <HeaderDetailsContainer>
            <ReactMarkdown>
              {pageData.sweetsCartInformation.childMarkdownRemark.rawMarkdownBody}
            </ReactMarkdown>
          </HeaderDetailsContainer>
        </Header>
      </ContentContainer>
      <BrochureSection>
        <Button url={pageData.brochure.file.url} text="View Brochure" size="XLARGE" openInNewTab/>
      </BrochureSection>
      <ContentContainer>
        <ProductWithImageContainer>
          {Boolean(productsWithImage) && productsWithImage.map(renderSweetsCartProductWithImage)}
        </ProductWithImageContainer>
        <ProductWithoutImageContainer>
          {Boolean(productsWithoutImage) && productsWithoutImage.map(renderSweetsCartProductWithoutImage)}
        </ProductWithoutImageContainer>
      </ContentContainer>
    </Layout>
  );
}

export default SweetsCartPage;

const BrochureSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(20)} 0;
  margin: ${sizing(10)} 0;
  @media all and (min-width: 768px) {
    padding: ${sizing(40)} 0;
    margin: ${sizing(50)} 0;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media all and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderImageContainer = styled.div`
  width: 70%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  @media all and (min-width: 768px) {
    margin-top: ${sizing(35)};
    width: ${sizing(700)};
  }
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 0;
`;

const ContentContainer = styled.div`
  margin: ${sizing(10)} auto ${sizing(10)} auto;
  width: 90%;
  @media all and (min-width: 992px) {
    margin: ${sizing(50)} auto ${sizing(50)} auto;
    width: 60%;
  }
`;

const HeaderDetailsContainer = styled.div`
  @media all and (min-width: 992px) {
    margin-left: ${sizing(40)};
  }
`;

const ProductWithImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1,1fr);
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: ${sizing(40)};
    grid-row-gap: ${sizing(40)};
  }
  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3,1fr);
    grid-column-gap: ${sizing(40)};
    grid-row-gap: ${sizing(40)};
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImageContainer = styled.div`
  width: 70%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: ${sizing(30)};
  @media all and (min-width: 768px) {
    width: ${sizing(300)};
  }
`;

const ProductImage = styled.img`
  width: 100%%;
  height: auto;
  margin-bottom: 0;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Name = styled.p`
  ${fonts.cursiveText['700']};
  text-align: center;
`;

const ProductPrice = styled.p`
  ${fonts.boldText['300']};
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  ${fonts.regularText['300']};
`;
const Flavors = styled.p`
  text-align: center;
  ${fonts.regularText['300']};
`;

const ProductWithoutImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1,1fr);
  margin-top: ${sizing(50)};
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: ${sizing(40)};
    grid-row-gap: ${sizing(40)};
  }
`;

export const query = graphql`
query SweetsCartQuery {
  allContentfulSweetsCartPage {
    nodes {
      sweetsCartImage {
        file {
          url
        }
      }
      brochure {
        file {
          url 
        }
      }
      sweetsCartInformation {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      products {
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        dozenPrice
        flavors
        image {
          file {
            url
          }
        }
        name
        price
      }
    }
  }
  sweetsCartHeaderImage: file(absolutePath: {regex: "/\\/images\\/sweets-cart\\/sweet-cart-header\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
    childImageSharp {
      fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`