if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
}


const snipCartBillingHTML = `
<item-line>
<div class="root">
  <li class="{'snipcart-item-line': true, 'snipcart-item-line--cart-edit': editingCart}">
    <div class="snipcart-item-line__container">
      <div class="snipcart-item-line__product">
        <div class="snipcart-item-line__header">
          <h2 class="snipcart-item-line__title snipcart__font--xlarge snipcart__font--secondary snipcart__font--black">
            {{ item.name }}
          </h2>
          <div class="snipcart-item-line__actions">
            <div>
              <item-quantity
                  class="snipcart-item-line__quantity"
                  v-if="item.id !== 'pickup' && item.name !== 'Delivery'"
              />
            </div>
          </div>
          <remove-item-action v-if="item.id !== 'pickup' && item.name !== 'Delivery'" class="snipcart__button--icon">
                <icon
                    name="trash"
                    class="snipcart__icon--red"
                    alt="item.remove_item"
                />
            </remove-item-action>
        </div>
        <div class="snipcart-item-line__content">
          <div class="snipcart-item-line__body">
            <div class="snipcart-item-line__variants">
              <div>
                <item-custom-fields v-if="!adding"></item-custom-fields>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
  </div>
</item-line>

<!--<cart-summary-item>-->
<!--   <slot v-bind="item">-->
<!--    <li class="snipcart-cart-summary-item">-->
<!--        <span class="snipcart-cart-summary-item__name snipcart__font&#45;&#45;slim">-->
<!--            {{ item.name }}-->
<!--            <item-custom-fields v-if="!adding"></item-custom-fields>-->
<!--        </span>-->

<!--        <span class="snipcart-cart-summary-item__quantity snipcart__font&#45;&#45;slim">-->
<!--            {{ $localize('cart_summary.quantity') }}{{ item.quantity }}-->
<!--        </span>-->

<!--        <span class="snipcart-cart-summary-item__price snipcart__font&#45;&#45;slim">-->
<!--            {{ item.totalPrice | money(currency) }}-->
<!--        </span>-->
<!--    </li>-->
<!--</slot>-->
<!--</cart-summary-item>-->
`;

module.exports = {
  siteMetadata: {
    title: 'Sugar Bliss Chicago',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-contentful-typescript',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon_180x180.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["SHOP_NAME", "SHOP_TOKEN"]
      },
    },
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: '3.0.27',
        publicApiKey: process.env.GATSBY_SNIPCART_API_KEY, // use public api key here or in environment variable
        openCartOnAdd: false,
        innerHTML: snipCartBillingHTML,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `utils`,
        path: `${__dirname}/src/utils/`,
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-typescript`,
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `sugarblisscakes`,
      },
    },
    'gatsby-plugin-instagram-embed',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `muli`,
          `source sans pro\:200,300, 400, 500, 600, 700, 800, 900`,
        ],
        display: 'swap'
      }
    },
    `gatsby-plugin-lodash`,
  ],
}
