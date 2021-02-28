export const displayPrice = (price) => {
  let formattedPrice = price;
  if (price % 1 !== 0) {
    const amountAfterDecimal = price.toString().length - (price.toString().indexOf('.') + 1)
    if (amountAfterDecimal === 1) {
      formattedPrice = formattedPrice.toString() + '0';
    }
  }

  return `$${formattedPrice}`;
}