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
  monthAvailable?: string | string[];
  isDaily: boolean;
  dayAvailable?: string;
  seasonalDaysAvailable?: string;
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
  monthAvailable?: string | string[];
  seasonalDaysAvailable?: string;
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
  monthAvailable?: string | string[];
  seasonalDaysAvailable?: string;
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
