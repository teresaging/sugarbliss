import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/layout'
import styled from '@emotion/styled';
import { fonts, Button } from '../design-system';
import { sizing, colors } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CupcakeQueryProps = {
  cupcakesHeaderImage: FluidImage;
  underlineImage: FluidImage;
};

type CupcakeProps = PageProps<CupcakeQueryProps>

const CupcakesPage = ({data}: CupcakeProps) => (
  <Layout>
    <Header>
      <HeaderImage fluid={data.cupcakesHeaderImage.childImageSharp.fluid} />
      <HeaderTextContainer>
       <HeaderText>Cupcakes</HeaderText>
       <Underline fluid={data.underlineImage.childImageSharp.fluid} />
      </HeaderTextContainer>
    </Header>
    <Intro>
      <div>
        <IntroTitle>Regular Cupcakes:</IntroTitle>
        <IntroText>Single: $3.95 | Dozen: $45</IntroText>
        <IntroText>Gluten Free, Single: $4.25 | Dozen: $48</IntroText>
        <IntroText>Vegan, Single: $4.50 | Dozen: $50</IntroText>
      </div>
      <div>
        <IntroTitle>Mini Cupcakes: </IntroTitle>
        <IntroText>Single: $2 | Dozen: $22</IntroText>
        <IntroText> Gluten Free, Dozen: $25</IntroText>
        <IntroText>Vegan, Dozen: $28</IntroText>
      </div>
    </Intro>
    <DailyMenuSection>
      <Button url="" text="View Daily Menu" size="LARGE"/>
    </DailyMenuSection>
  </Layout>
)

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${sizing(330)};
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const HeaderImage = styled(Img)`
  width: 100%;
  height: auto;
`;

const HeaderText = styled.p`
  ${fonts.cursiveText['5000']};
  text-align: center;
  color: ${colors.solids.WHITE};
`;

const HeaderTextContainer = styled.div`
  position: absolute;
`;

const Underline = styled(Img)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${sizing(300)};
`;

const Intro = styled.div`
  text-align: center;
  color: ${colors.solids.BROWN};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sizing(75)} ${sizing(50)} ${sizing(75)} ${sizing(50)};
  &> div{
    margin: 0 ${sizing(50)};
  }
`;

const IntroTitle = styled.p`
  ${fonts.boldText['400']};
`;

const IntroText = styled.p`
  ${fonts.regularText['400']};
`;

const DailyMenuSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(40)} 0;
  margin: ${sizing(50)} 0;
`;

export default CupcakesPage;

export const query = graphql`
query CupcakesQuery {
  cupcakesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cupcakes\\/cupcakesHeaderImage\\.jpg/"}) {
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