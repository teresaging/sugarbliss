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