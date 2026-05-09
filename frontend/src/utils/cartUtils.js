export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price

  // ---itemPrice
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * Number(item.qty), 0)
  );
  // calculate shippin price ( if items price > 100 then free shippin else $10)
  // ---shippingprice
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  // calculate tax price
  // ----textprice
  state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));
  // calculate total price
  // ----totalprice
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
