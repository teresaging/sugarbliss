export const PIXEL_TO_REM_RATIO = 10;

export const pixelToRem = (
  pixel: number,
  unit = PIXEL_TO_REM_RATIO
): string => {
  return `${pixel / unit}rem`;
};