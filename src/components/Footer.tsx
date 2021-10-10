import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import moment from 'moment';
import { Facebook, Instagram, Twitter } from 'react-feather';

import { fonts } from '../design-system';
import { sizing, colors } from '../utils';

type Props = {
  logo: FluidObject;
  WBELogo: FluidObject;
  NMSDCLogo: FluidObject;
}

const Footer = ({logo, WBELogo, NMSDCLogo}: Props) => {

  const currentYear = moment().year();

  const mailChipEmbed = `<!-- Begin Mailchimp Signup Form -->
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:transparent; clear:left; font:14px Helvetica,Arial,sans-serif; }
        #mc_embed_signup .button{background-color: #f4d7d9; color: #4F2C1D;}
        #mc_embed_signup .button:hover{background-color: #f4d7d9; color: #4F2C1D;}
        #mergeRow-gdpr{margin-top: 0!important;padding-bottom: 0!important;}
        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
        We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
      </style>
      <style type="text/css">
        #mc-embedded-subscribe-form input[type=checkbox]{display: inline; width: auto;margin-right: 10px;}
        #mergeRow-gdpr {margin-top: 20px;}
        #mergeRow-gdpr fieldset label {font-weight: normal;}
        #mc-embedded-subscribe-form .mc_fieldset{border:none;min-height: 0px;padding-bottom:0px;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://sugarblisscakes.us19.list-manage.com/subscribe/post?u=82aa5d566ac285ca177c069dd&amp;id=7781bf4ea8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <div class="mc-field-group">
              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
              </label>
              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
            </div>
            <div id="mergeRow-gdpr" class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group">
            <div class="content__gdpr">
               <label>Marketing Permissions</label>
               <p>Please select all the ways you would like to hear from Sugar Bliss Cake Boutique:</p>
               <fieldset class="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field">
        \t\t<label class="checkbox subfield" for="gdpr_72070"><input type="checkbox" id="gdpr_72070" name="gdpr[72070]" value="Y" class="av-checkbox "><span>Email</span> </label>
               </fieldset>
               <p>You can unsubscribe at any time by clicking the link in the footer of our emails. For information about our privacy practices, please visit our website.</p>
           </div>
              <div class="content__gdprLegal">
                <p>We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a href="https://mailchimp.com/legal/" target="_blank">Learn more about Mailchimp's privacy practices here.</a></p>
              </div>
            </div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display:none"></div>
              <div class="response" id="mce-success-response" style="display:none"></div>
            </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_82aa5d566ac285ca177c069dd_7781bf4ea8" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
        </form>
      </div>
      <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
      <!--End mc_embed_signup-->`

  return (
    <FooterWrapper>
      <Column textAlign="left">
        {/*<LogoContainer>*/}
        {/*  <Img fluid={logo} />*/}
        {/*</LogoContainer>*/}
        <div>Join our mailing list</div>
        <div dangerouslySetInnerHTML={{__html: mailChipEmbed}} />
      </Column>
      <Column textAlign="center">
        <Address>122 S Wabash</Address>
        <Address>Chicago, IL 60603</Address>
        <Address>312-845-9669</Address>
        <CertifiedLogosContainer>
          <WBELogoImg fluid={WBELogo} />
          <NMSDCLogoImg fluid={NMSDCLogo} />
        </CertifiedLogosContainer>
        <SocialMediaIconsWrapper>
          <a href="https://www.facebook.com/sugarblisscakes/" target="_blank"><Facebook fill="white" strokeWidth={0} size={25} /></a>
          <a href="https://www.instagram.com/sugarblisscakes/" target="_blank"><Instagram  size={25} /></a>
          <a href="https://twitter.com/sugarblisscakes" target="_blank"><Twitter fill="white" strokeWidth={0}  size={25} /></a>
        </SocialMediaIconsWrapper>
        <Copyright>Copyright © {currentYear} Sugar Bliss LLC. All Rights Reserved.</Copyright>
      </Column>
    </FooterWrapper>
  )
};

const FooterWrapper = styled.div`
 background-color: ${colors.solids.BROWN};
 color: ${colors.solids.WHITE};
 display: grid;
 grid-template-columns: 1fr;
 padding: ${sizing(40)} ${sizing(20)} 0 ${sizing(20)};
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Column = styled.div<{textAlign: string}>`
  text-align: ${({textAlign}) => textAlign};
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 150px;
`;

const Address = styled.p`
  ${fonts.regularText['200']};
  margin-bottom: ${sizing(5)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(15)};
    ${fonts.regularText['400']};
  }
`;

const CertifiedLogosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${sizing(20)};
`;

const WBELogoImg = styled(Img)`
  width:  ${sizing(50)};
  height: ${sizing(25)};
  margin: 0 ${sizing(15)};
  @media all and (min-width: 768px) {
    width:  ${sizing(100)};
    height: ${sizing(50)};
  }
`;

const NMSDCLogoImg = styled(Img)`
  width:  ${sizing(41.5)};
  height: ${sizing(25)};
  margin: 0 ${sizing(15)};
  @media all and (min-width: 768px) {
    width:  ${sizing(83)};
    height: ${sizing(50)};
  }
`;

const Copyright = styled.p`
  ${fonts.regularText['100']};
  margin-top: ${sizing(20)};
  margin-bottom: ${sizing(10)};
`;

const SocialMediaIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${sizing(40)};
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 ${sizing(8)};
    transition: 0.2s opacity;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export default Footer;