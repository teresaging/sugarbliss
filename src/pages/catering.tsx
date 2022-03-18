import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled';

import Layout from '../components/layout';
import { ProductHeader, OrderFooter, fonts, Button } from '../design-system';
import { sizing, colors } from '../utils';
import { ContentfulAsset, CateringProducts } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CateringQueryProps = {
  underlineImage: FluidImage;
  cateringHeaderImage: FluidImage;
  cateringFooterImage: FluidImage;
  allContentfulAsset: {
    nodes: ContentfulAsset[];
  };
  allContentfulCatering: {
    nodes: CateringProducts[];
  }
}

type CateringPageProps = PageProps<CateringQueryProps>;

const renderOtherProducts = (products) => {

  return (
    <>
      {products.map((item, idx) => (
        <Product key={idx}>
          <Name>{item.name} {item.price && `$${item.price}`}</Name>
          {item.description && (<Text>{item.description}</Text>)}
        </Product>
      ))}
    </>
  );
}

const CateringPage = ({data}: CateringPageProps) => {
  const sweetsCateringPackageData = data.allContentfulCatering.nodes.filter((data) => data.category ===  'Sweets Catering Package' && data.name !== 'Sweets Catering Prices');
  const sweetsCateringPriceData = data.allContentfulCatering.nodes.filter((data) => data.category ===  'Sweets Catering Package' && data.name === 'Sweets Catering Prices')[0];
  const sweetsCateringImage = data.allContentfulAsset.nodes.filter((data) => data.title === 'Sweets Catering Package')[0];

  const breakfastCateringPackageMainFlavors = data.allContentfulCatering.nodes.filter((data) => data.category ===  'Breakfast Catering Package' && data.name !== 'Breakfast Catering Package Prices' && data.isMainFlavor);
  const breakfastCateringPackageAddOns = data.allContentfulCatering.nodes.filter((data) => data.category ===  'Breakfast Catering Package' && data.name !== 'Breakfast Catering Package Prices' && !data.isMainFlavor);
  const breakfastCateringPriceData = data.allContentfulCatering.nodes.filter((data) => data.category ===  'Breakfast Catering Package' && data.name === 'Breakfast Catering Package Prices')[0];
  const breakfastCateringImage = data.allContentfulAsset.nodes.filter((data) => data.title === 'Breakfast Catering Package')[0];

  const additionalCravingsData = data.allContentfulCatering.nodes.filter((data) => data.category === 'Additional Cravings');

  const beveragesData = data.allContentfulCatering.nodes.filter((data) => data.category === 'Beverages');

  return (
    <Layout>
      <ProductHeader backgroundImage={data.cateringHeaderImage} underlineImage={data.underlineImage} productName="Catering" isFullWidth />
      <MenuSection>
        <MenuTitle>
          Let Sugar Bliss cater your next meeting, party, or event!
        </MenuTitle>
        <ButtonContainer>
          <Button url="/order" text="Ordering Catering" size="XLARGE" />
        </ButtonContainer>
      </MenuSection>
      <Content>
        {Boolean(sweetsCateringPackageData) && (
          <PackageSection>
            <ProductContent>
              <SectionTitle>Sweets Catering Package</SectionTitle>
              {sweetsCateringPackageData.map((item, idx) => (
                <Product key={idx}>
                  <Name>{item.name}</Name>
                  {item.description && (<Text>{item.description}</Text>)}
                </Product>
              ))}
              <PackagePriceContainer>
                {sweetsCateringPriceData.smallPrice && (<Text>Small ${sweetsCateringPriceData.smallPrice} {sweetsCateringPriceData.smallServingSize && `(${sweetsCateringPriceData.smallServingSize})`}</Text>)}
                {sweetsCateringPriceData.mediumPrice && (<Text>Medium ${sweetsCateringPriceData.mediumPrice} {sweetsCateringPriceData.mediumServingSize && `(${sweetsCateringPriceData.mediumServingSize})`}</Text>)}
                {sweetsCateringPriceData.largePrice && (<Text>Large ${sweetsCateringPriceData.largePrice} {sweetsCateringPriceData.largeServingSize && `(${sweetsCateringPriceData.largeServingSize})`}</Text>)}
              </PackagePriceContainer>
            </ProductContent>
            <PackageImageContainer>
              <PackageImage src={sweetsCateringImage.file.url}/>
            </PackageImageContainer>
          </PackageSection>
        )}
        {Boolean(breakfastCateringPackageMainFlavors) && (
          <PackageSection>
            <PackageImageContainer>
              <PackageImage src={breakfastCateringImage.file.url}/>
            </PackageImageContainer>
            <ProductContent>
              <SectionTitle>Breakfast Catering Package</SectionTitle>
              {breakfastCateringPackageMainFlavors.map((item, idx) => (
                <Product key={idx}>
                  <Name>{item.name}</Name>
                  {item.description && (<Text>{item.description}</Text>)}
                </Product>
              ))}
              <PackagePriceContainer>
                {breakfastCateringPriceData.smallPrice && (<Text>Small ${breakfastCateringPriceData.smallPrice} {breakfastCateringPriceData.smallServingSize && `(${breakfastCateringPriceData.smallServingSize})`}</Text>)}
                {breakfastCateringPriceData.mediumPrice && (<Text>Medium ${breakfastCateringPriceData.mediumPrice} {breakfastCateringPriceData.mediumServingSize && `(${breakfastCateringPriceData.mediumServingSize})`}</Text>)}
                {breakfastCateringPriceData.largePrice && (<Text>Medium ${breakfastCateringPriceData.largePrice} {breakfastCateringPriceData.largeServingSize && `(${breakfastCateringPriceData.largeServingSize})`}</Text>)}
              </PackagePriceContainer>
              {Boolean(breakfastCateringPackageAddOns) &&
                <BreakfastCateringAddOns>
                  {breakfastCateringPackageAddOns.map((item, idx) => (
                    <Product key={idx}>
                      <Name>{item.name} {item.price && `$${item.price}`}</Name>
                      {item.description && (<Text>{item.description}</Text>)}
                      {item.smallPrice && (
                        <Text>Small ${item.smallPrice} {item.smallServingSize && `(${item.smallServingSize})`}</Text>)}
                      {item.mediumPrice && (<Text>Medium
                        ${item.mediumPrice} {item.mediumServingSize && `(${item.mediumServingSize})`}</Text>)}
                      {item.largePrice && (
                        <Text>Large ${item.largePrice} {item.largeServingSize && `(${item.largeServingSize})`}</Text>)}
                    </Product>
                  ))}
                </BreakfastCateringAddOns>
              }
            </ProductContent>
          </PackageSection>
        )}
        {Boolean(additionalCravingsData) && (
          <Section>
            <ProductContent>
              <SectionTitle>Additional Cravings</SectionTitle>
              {renderOtherProducts(additionalCravingsData)}
            </ProductContent>
          </Section>
        )}
        {Boolean(beveragesData) && (
          <Section>
            <ProductContent>
              <SectionTitle>Beverages</SectionTitle>
              {renderOtherProducts(beveragesData)}
            </ProductContent>
          </Section>
        )}
        <CustomInformation>
          Custom logos are available on cupcakes, cake pops, French macarons, and sugar cookies. Let us create a special treat for your next event -- corporate events, baby or bridal showers or birthday celebrations. Please allow 48 hours notice.
        </CustomInformation>
        <OrderingDetails>
          <SectionTitle>
            Ordering Details
          </SectionTitle>
          <CustomInformation>
            Catering is available Monday-Saturday, all orders must be placed by 12pm the day before and by 12pm Friday for all Monday orders. Delivery available 9am-4pm (Monday-Friday) and 10am-4pm (Saturday). Delivery fees are as quoted when order is placed. All prices are before tax.
          </CustomInformation>
        </OrderingDetails>
      </Content>
      <OrderFooter backgroundImage={data.cateringFooterImage} />
    </Layout>
  );
};

export default CateringPage;

const MenuSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.solids.BABY_PINK};
  padding: ${sizing(20)} 0;
  margin: ${sizing(20)} 0;
  @media all and (min-width: 768px) {
    padding: ${sizing(40)} 0;
    margin: ${sizing(50)} 0;
  }
`;

const MenuTitle = styled.p`
  ${fonts.boldText['300']};
  text-align: center;
  @media all and (min-width: 768px) {
  ${fonts.boldText['800']};
  }
`;

const ButtonContainer = styled.div`
  margin-top: ${sizing(20)};
`;

const Content = styled.div`
  margin: ${sizing(20)} auto ${sizing(15)} auto;
  width: 85%;
  @media all and (min-width: 768px) {
    margin: ${sizing(100)} auto ${sizing(75)} auto;
  }
  @media all and (min-width: 992px) {
     width: 60%;
  }
`;

const OrderingDetails = styled.div`
  margin: ${sizing(20)} 0;
  text-align: center;
`;

const SectionTitle = styled.p`
  ${fonts.cursiveText['700']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['1000']};
  }
`;

const Text = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 768px) {
   ${fonts.regularText['500']};
  }
`;

const CustomInformation = styled.p`
  ${fonts.regularText['200']};
  margin: ${sizing(10)} 0 ${sizing(30)} 0;
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['600']};
    margin: ${sizing(20)} 0 ${sizing(100)} 0;
  }
`;

const PackageSection = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  margin-bottom: ${sizing(50)};
  @media all and (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${sizing(50)};
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Product = styled.div`
  text-align: center;
  margin: ${sizing(10)} 0;
`;

const Name = styled.p`
  ${fonts.boldText['300']};
  @media all and (min-width: 768px) {
    ${fonts.boldText['600']};
  }
`;

const PackageImageContainer = styled.div`
  justify-self: center;
  align-self: center;
  display: none;
  @media all and (min-width: 992px) {
     display: block;
  }
`;

const PackageImage = styled.img`
    border-radius: 50%;
    height: auto;
    width: 100%;
    max-width: ${sizing(1000)};
    margin-bottom: ${sizing(35)};
`

const PackagePriceContainer = styled.div`
  margin-top: ${sizing(0)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media all and (min-width: 768px) {
    margin-top: ${sizing(25)};
  }
`;

const BreakfastCateringAddOns = styled.div`
  margin-top: ${sizing(25)};
`;

const Section = styled.div`
  margin: ${sizing(50)} 0;
`;

export const query = graphql`
  query CateringQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cateringHeaderImage: file(absolutePath: {regex: "/\\/images\\/catering\\/catering-header\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cateringFooterImage: file(absolutePath: {regex: "/\\/images\\/catering\\/catering-footer\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulAsset(filter: {title: {in: ["Breakfast Catering Package", "Sweets Catering Package"]}}) {
      nodes {
        file {
          url
        }
        title
      }
    }
    allContentfulCatering(sort: {fields: createdAt}) {
      nodes {
        category
        description
        largePrice
        largeServingSize
        mediumPrice
        mediumServingSize
        name
        smallPrice
        smallServingSize
        price
        isMainFlavor
      }
    }
  }
`
