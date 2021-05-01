export type SeasonalDate = {
  name: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
}

export type Cupcake = {
  name: string;
  description: string;
  image: {
    file: {
      url: string;
    }
  }
  isEverydayFlavor: boolean;
  isSeasonal: boolean;
  seasonalStartDate?: Date;
  seasonalEndDate?: Date;
  monthAvailable?: string | string[];
  isDaily: boolean;
  weekDaysAvailable?: string[];
  seasonalDaysAvailable?: string;
  seasonalDatesAvailable?: SeasonalDate[];
  isAvailableInGlutenFree?: boolean;
  isVeganFlavor?: boolean;
};

export type Macaron = {
  name: string;
  description: string;
  image: {
    file: {
      url: string;
    }
  }
  isSeasonalFlavor: boolean;
  isRotatingFlavor: boolean;
  seasonalStartDate?: Date;
  seasonalEndDate?: Date;
  monthAvailable?: string | string[];
  seasonalDaysAvailable?: string;
  seasonalDatesAvailable?: SeasonalDate[];
}

export type CakePop = {
  name: string;
  description: string;
  image: {
    file: {
      url: string;
    }
  }
  isClassicCollection: boolean;
  isSeasonal: boolean;
  seasonalDatesAvailable?: SeasonalDate[];
}

export type MorningPastry = {
  name: string;
  description?: string;
  flavors?: string[];
  price?: number;
  dozenPrice?: number;
}

export type FrostingShot = {
  price: number;
  flavors: string[];
}

export type Cakes = {
  name: string;
  category: string;
  price: number;
  servingDescription: string;
  description: string;
}

export type Cookies = {
  name: string;
  type: string;
  description: string; // supports rich text
  price?: number;
  dozenPrice?: number;
  customPrice?: number;
}

export type BarsBrownies = {
  name: string;
  description?: string;
}

export type OtherGoodies = {
  name: string;
  description?: string;
  type: string;
  price?: number;
}

export type SweetCrepes = {
  name: string;
  description?: string;
  price?: number;
  isTopping?: boolean;
  flavors?: string[];
}

export type CateringProducts = {
  name: string;
  category: string;
  description?: string;
  price?: number;
  smallPrice?: number;
  smallServingSize?: string;
  mediumPrice?: number;
  mediumServingSize?: string;
  largePrice?: number;
  largeServingSize?: string;
  isMainFlavor?: boolean;
}

export type Store = {
  childContentfulStoreAddressRichTextNode: {
    // tslint:disable-next-line:no-any
    json: any;
  };
  childContentfulStoreHoursRichTextNode: {
    // tslint:disable-next-line:no-any
    json: any;
  }
}

export type About = {
  teresaImage: {
    file: {
      url: string;
    }
  };
  about: {
    childMarkdownRemark: {
      rawMarkdownBody: string;
    }
  }
}

export type Weddings = {
  name: string;
  price: number;
  miniPrice: number;
  priceAmount: string;
  priceRange: string;
  flavors: string[];
  type: string;
}

export type ContentfulAsset = {
  file: {
    url: string;
  };
  title?: string;
}

export type OrderForm = {
  tabName: string;
  categories: OrderCategory[];
}

export type OrderCategory = {
  name: string;
  products?: OrderProduct[];
}

export type OrderProduct = {
  name: string;
  description?: string;
  price?: number;
  customFields?: OrderCustomFields[];
}

export type OrderCustomFields = {
  name: string;
  type: string;
  choices?: string[];
  isMakeYourOwnFlavor?: boolean;
  makeYourOwnFlavorsQuantity?: number;
}

export type ProductPage = {
  name: string;
  flavorChart: { // might change this name
    file: {
      url: string;
    }
  };
}

export type HomePageContent = {
  description: { // this is contentful being annoying
    internal: {
      content: string;
    };
  }
}