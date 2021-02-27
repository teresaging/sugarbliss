export type color = keyof typeof solids;
export type grays = keyof typeof grays;

interface Colors {
  solids: { [K in color]: string };
  grays: { [K in grays]: string };
}

const solids = {
  BROWN: '#4F2C1D',
  MAIN_MED_BLUE: '#619ec2',
  MAIN_LIGHT_BLUE: '#98d9ec',
  MAIN_MED_PINK: '#e6a3b4',
  MAIN_LIGHT_PINK: '#f7aec0',
  DARK_BLUE: '#2c3a56',
  BABY_BLUE: '#d9edf7',
  BABY_PINK: '#fef6f5',
  WHITE: '#FFF',
  ERROR: 'red',
};


export const colors: Colors = { solids };