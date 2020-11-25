export type color = keyof typeof solids;
export type grays = keyof typeof grays;

interface Colors {
  solids: { [K in color]: string };
  grays: { [K in grays]: string };
}

const solids = {
  BROWN: '#4F2C1D',
  MAIN_MED_BLUE: '#36bee8',
  MAIN_LIGHT_BLUE: '#98d9ec',
  BABY_BLUE: '#d9edf7',
  BABY_PINK: '#fef6f5',
  WHITE: '#FFF',
};


export const colors: Colors = { solids };