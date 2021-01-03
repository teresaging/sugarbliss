if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
}


const snipCartBillingHTML = `
<item-line>
  <li class="{'snipcart-item-line': true, 'snipcart-item-line--cart-edit': editingCart}">
    <div class="snipcart-item-line__container">
      <div class="snipcart-item-line__product">
        <div class="snipcart-item-line__header">
          <h2 class="snipcart-item-line__title snipcart__font--xlarge snipcart__font--secondary snipcart__font--black">
            {{ item.name }} - {{item.customFields[0]?.displayValue}}
          </h2>
          <div class="snipcart-item-line__actions">
            <div>
              <item-quantity
                  class="snipcart-item-line__quantity"
                  v-if="item.id !== 'pickup' && item.id !== 'delivery'"
              />
            </div>
          </div>
          <remove-item-action v-if="item.id !== 'pickup' && item.id !== 'delivery'" class="snipcart__button--icon">
                <icon
                    name="trash"
                    class="snipcart__icon--red"
                    alt="item.remove_item"
                />
            </remove-item-action>
        </div>
      </div>
    </div>
  </li>
</item-line>

<cart-summary-item>
   <slot v-bind="item">
    <li class="snipcart-cart-summary-item">
        <span class="snipcart-cart-summary-item__name snipcart__font--slim">
            {{ item.name }} - {{item.customFields[0].displayValue}}
        </span>

        <span v-if="item.totalPrice !== 0" class="snipcart-cart-summary-item__quantity snipcart__font--slim">
            {{ $localize('cart_summary.quantity') }}{{ item.quantity }}
        </span>

        <span v-if="item.totalPrice !== 0" class="snipcart-cart-summary-item__price snipcart__font--slim">
            {{ item.totalPrice | money(currency) }}
        </span>
    </li>
</slot>
</cart-summary-item>
`;

module.exports = {
  siteMetadata: {
    title: 'Sugar Bliss Cakes',
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
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
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
        version: '3.0.19',
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
