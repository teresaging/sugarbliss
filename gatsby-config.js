if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
}


const snipCartBillingHTML = `
<item-line>
  <li v-if="item.id !== 'pickup-from-store' && item.id !== 'local-delivery'" class="{'snipcart-item-line': true, 'snipcart-item-line--cart-edit': editingCart}">
    <div class="snipcart-item-line__container">
      <div class="snipcart-item-line__product">
        <div class="snipcart-item-line__header">
          <h2 class="snipcart-item-line__title snipcart__font--xlarge snipcart__font--secondary snipcart__font--black">
            {{ item.name }} - {{item.customFields[0].displayValue}}
          </h2>
          <div class="snipcart-item-line__actions">
            <div>
<!--              <item-quantity-->
<!--                  class="snipcart-item-line__quantity"-->
<!--                  v-if="!adding && !isSubscribable"-->
<!--                  :disabled="outOfStock || isSubscribable"-->
<!--              ></item-quantity>-->
            </div>
            <remove-item-action class="snipcart__button--icon">
                <icon
                    name="trash"
                    class="snipcart__icon--red"
                    alt="item.remove_item"
                />
            </remove-item-action>
          </div>
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


<!--<billing>-->
<!--  <snipcart-form @submit="save" id="snipcart-billing-form">-->
<!--      <div class="snipcart__box">-->
<!--          <div class="snipcart__box&#45;&#45;header">-->
<!--              <div class="snipcart__box&#45;&#45;title">-->
<!--                  <div class="snipcart__box&#45;&#45;badge snipcart__box&#45;&#45;badge snipcart__box&#45;&#45;badge-highlight snipcart__font&#45;&#45;bold snipcart__font&#45;&#45;secondary">{{ number }}</div>-->
<!--                  <h1 class="snipcart__font&#45;&#45;subtitle">-->
<!--                      Details-->
<!--                      {{cart.items}}-->
<!--                  </h1>-->
<!--              </div>-->
<!--          </div>-->

<!--          <snipcart-error-message small="true" icon="console" show-fields-errors="false"></snipcart-error-message>-->
<!--          -->
<!--          <li v-for="item in cart.items">-->
<!--            <span v-if="item.id == 'local-delivery'">-->
<!--              <snipcart-checkbox name="forAFriend" />-->
<!--              <snipcart-label for="forAFriend" class="snipcart-form__label&#45;&#45;checkbox">Check this box if this is being delivered to a friend</snipcart-label>-->
<!--            </span>-->
<!--          </li>-->
<!--         -->
<!--          -->
<!--          <fieldset class="snipcart-form__set">-->
<!--              <div class="snipcart-form__field">-->
<!--                  <snipcart-label class="snipcart__font&#45;&#45;tiny" for="name">-->
<!--                      {{ $localize('address_form.name') }}-->
<!--                  </snipcart-label>-->
<!--                  -->
<!--                  <snipcart-input name="name"></snipcart-input>-->
<!--                  <snipcart-error-message name="name"></snipcart-error-message>-->
<!--              </div>-->

<!--              <div class="snipcart-form__field">-->
<!--                  <snipcart-label class="snipcart__font&#45;&#45;tiny" for="email">-->
<!--                      {{ $localize('address_form.email' )}}-->
<!--                  </snipcart-label>-->

<!--                  <snipcart-input name="email" v-if="!emailIsReadonly"></snipcart-input>-->
<!--                  <span class="snipcart__font&#45;&#45;secondary snipcart__font&#45;&#45;bold" v-else>{{ customer.email }}</span>-->
<!--                  <snipcart-error-message name="email"></snipcart-error-message>-->
<!--              </div>-->
<!--          </fieldset>-->
<!--        -->
<!--          -->
<!--          <fieldset class="snipcart-form__set">-->
<!--            <div class="snipcart-form__row">-->
<!--              <div class="snipcart-form__field snipcart-form__cell&#45;&#45;large">-->
<!--                <snipcart-label-->
<!--                  class="snipcart__font&#45;&#45;tiny"-->
<!--                  for="address1"-->
<!--                >{{ $localize('address_form.address1') }}</snipcart-label>-->
<!--                <snipcart-input name="address1"></snipcart-input>-->
<!--                <snipcart-error-message name="address1"></snipcart-error-message>-->
<!--              </div>-->
<!--    -->
<!--              <div class="snipcart-form__field snipcart-form__cell&#45;&#45;tidy">-->
<!--                <snipcart-label-->
<!--                  class="snipcart__font&#45;&#45;tiny"-->
<!--                  for="address2"-->
<!--                >{{ $localize('address_form.address2') }}</snipcart-label>-->
<!--                <snipcart-input name="address2"></snipcart-input>-->
<!--                <snipcart-error-message name="address2"></snipcart-error-message>-->
<!--              </div>-->
<!--            </div>-->
<!--    -->
<!--            <div class="snipcart-form__field">-->
<!--              <snipcart-label-->
<!--                class="snipcart__font&#45;&#45;tiny"-->
<!--                for="city"-->
<!--              >{{ $localize('address_form.city') }}</snipcart-label>-->
<!--              <snipcart-input name="city"></snipcart-input>-->
<!--              <snipcart-error-message name="city"></snipcart-error-message>-->
<!--            </div>-->
<!--    -->
<!--            <div class="snipcart-form__field">-->
<!--              <snipcart-label-->
<!--                class="snipcart__font&#45;&#45;tiny"-->
<!--                for="country"-->
<!--              >{{ $localize('address_form.country') }}</snipcart-label>-->
<!--              <snipcart-typeahead type="dropdown" name="country" autocomplete="country"></snipcart-typeahead>-->
<!--            </div>-->
<!--    -->
<!--            <div class="snipcart-form__row">-->
<!--              <div class="snipcart-form__field snipcart-form__cell&#45;&#45;large">-->
<!--                <snipcart-label-->
<!--                  class="snipcart__font&#45;&#45;tiny"-->
<!--                  for="province"-->
<!--                >{{ $localize('address_form.province') }}</snipcart-label>-->
<!--                <snipcart-typeahead type="dropdown" name="province" autocomplete="province state"></snipcart-typeahead>-->
<!--              </div>-->
<!--    -->
<!--              <div class="snipcart-form__field snipcart-form__cell&#45;&#45;tidy">-->
<!--                <snipcart-label-->
<!--                  class="snipcart__font&#45;&#45;tiny"-->
<!--                  for="postalCode"-->
<!--                >{{ $localize('address_form.postalCode') }}</snipcart-label>-->
<!--                <snipcart-input name="postalCode"></snipcart-input>-->
<!--                <snipcart-error-message name="postalCode"></snipcart-error-message>-->
<!--              </div>-->
<!--            </div>-->
<!--          </fieldset>-->

<!--          <hr class="snipcart-form__separator" v-if="shippingEnabled" />-->

<!--          <fieldset class="snipcart-form__set snipcart-form__set&#45;&#45;different-shipping" v-if="shippingEnabled && !hasOnlyNonShippableGoods">-->
<!--              <div class="snipcart-form__field">-->
<!--                  <div class="snipcart-form__field-checkbox">-->
<!--                      <snipcart-checkbox name="useDifferentShippingAddress" />-->

<!--                      <snipcart-label class="snipcart__font&#45;&#45;tiny snipcart-form__label&#45;&#45;checkbox" for="useDifferentShippingAddress">-->
<!--                          {{ $localize('billing.use_different_shipping_address') }}-->
<!--                      </snipcart-label>-->
<!--                  </div>-->
<!--              </div>-->
<!--          </fieldset>-->

<!--          <div class="snipcart-form__footer">-->
<!--              <snipcart-submit class="snipcart-cart-button&#45;&#45;highlight snipcart__font&#45;&#45;large">-->
<!--                  {{ shippingEnabled ? $localize('billing.continue_to_shipping') : $localize('payment.continue_to_payment') }}-->
<!--              </snipcart-submit>-->
<!--          </div>-->
<!--      </div>-->
<!--  </snipcart-form>-->
<!--</billing>-->
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
    }
  ],
}
